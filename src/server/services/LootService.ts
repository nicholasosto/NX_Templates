/**
 * @file        src/server/services/LootService.ts
 * @module      LootService
 * @layer       Server
 * @description Service for managing loot generation, drops, and reward distribution.
 */

import { Workspace } from "@rbxts/services";
import { 
	LOOT_TABLE_KEYS, 
	LootTableKey, 
	LootEntry, 
	LootTableMeta, 
	LootTableMetaMap 
} from "shared/definitions/Loot";

interface LootDrop {
	readonly id: string;
	readonly itemId: string;
	readonly quantity: number;
	readonly position: Vector3;
	readonly timestamp: number;
	readonly expiresAt: number;
}

export class LootService {
	private static instance: LootService;
	private activeLootDrops = new Map<string, LootDrop>();
	private lootAnimations = new Map<string, RBXScriptConnection>();
	private nextLootId = 1;
	private readonly LOOT_EXPIRE_TIME = 60; // seconds

	private constructor() {
		this.setupLootFolder();
		this.startCleanupLoop();
	}

	public static getInstance(): LootService {
		if (!LootService.instance) {
			LootService.instance = new LootService();
		}
		return LootService.instance;
	}

	/**
	 * Generates loot from a loot table and drops it at the specified position
	 */
	public dropLoot(tableKey: LootTableKey, position: Vector3, multiplier: number = 1): LootDrop[] {
		const lootTable = this.getLootTable(tableKey);
		if (!lootTable) {
			warn(`LootService: Unknown loot table: ${tableKey}`);
			return [];
		}

		const generatedLoot = this.generateLootFromTable(lootTable, multiplier);
		const lootDrops: LootDrop[] = [];

		for (const loot of generatedLoot) {
			const drop = this.createLootDrop(loot.drop, loot.quantity, position);
			if (drop) {
				lootDrops.push(drop);
			}
		}

		return lootDrops;
	}

	/**
	 * Generates loot without dropping it (for inventory rewards, etc.)
	 */
	public generateLoot(tableKey: LootTableKey, multiplier: number = 1): Array<{ itemId: string; quantity: number }> {
		const lootTable = this.getLootTable(tableKey);
		if (!lootTable) {
			warn(`LootService: Unknown loot table: ${tableKey}`);
			return [];
		}

		return this.generateLootFromTable(lootTable, multiplier).map(item => ({
			itemId: item.drop,
			quantity: item.quantity
		}));
	}

	/**
	 * Collects a loot drop (removes from world and returns the loot)
	 */
	public collectLoot(lootId: string): LootDrop | undefined {
		const loot = this.activeLootDrops.get(lootId);
		if (!loot) {
			return undefined;
		}

		this.activeLootDrops.delete(lootId);
		this.removeLootModel(lootId);
		
		return loot;
	}

	/**
	 * Gets all active loot drops
	 */
	public getActiveLootDrops(): ReadonlyMap<string, LootDrop> {
		return this.activeLootDrops;
	}

	/**
	 * Gets loot drops within a certain radius of a position
	 */
	public getLootNearPosition(position: Vector3, radius: number): LootDrop[] {
		const nearbyLoot: LootDrop[] = [];
		
		for (const [_, loot] of this.activeLootDrops) {
			const distance = position.sub(loot.position).Magnitude;
			if (distance <= radius) {
				nearbyLoot.push(loot);
			}
		}
		
		return nearbyLoot;
	}

	/**
	 * Gets available loot table keys
	 */
	public getAvailableLootTables(): readonly LootTableKey[] {
		return LOOT_TABLE_KEYS;
	}

	/**
	 * Gets a specific loot table by key
	 */
	public getLootTable(tableKey: LootTableKey): LootTableMeta | undefined {
		return LootTableMetaMap[tableKey];
	}

	private generateLootFromTable(lootTable: LootTableMeta, multiplier: number): Array<{ drop: string; quantity: number }> {
		const results: Array<{ drop: string; quantity: number }> = [];
		
		// Calculate total weight
		const totalWeight = lootTable.entries.reduce((sum: number, entry: LootEntry) => sum + entry.weight, 0);
		
		// Generate loot based on roll count
		const minRolls = lootTable.rolls[0];
		const maxRolls = lootTable.rolls[1];
		const rollCount = math.random(minRolls, maxRolls);
		
		// Add guaranteed drops first
		if (lootTable.guaranteed) {
			for (const guaranteedDrop of lootTable.guaranteed) {
				const quantity = this.calculateQuantity(guaranteedDrop.quantity, multiplier);
				results.push({ drop: guaranteedDrop.drop, quantity });
			}
		}
		
		// Perform rolls for entries
		for (let i = 0; i < rollCount; i++) {
			const randomValue = math.random() * totalWeight;
			let currentWeight = 0;
			
			for (const entry of lootTable.entries) {
				currentWeight += entry.weight;
				if (randomValue <= currentWeight) {
					// Calculate quantity (with multiplier applied)
					const quantity = this.calculateQuantity(entry.quantity, multiplier);
					
					// Check if we should add this to existing entry or create new one
					const existingResult = results.find(r => r.drop === entry.drop);
					if (existingResult && !entry.unique) {
						existingResult.quantity += quantity;
					} else if (!existingResult) {
						results.push({ drop: entry.drop, quantity });
					}
					break;
				}
			}
		}
		
		return results;
	}

	private calculateQuantity(quantitySpec: number | readonly [number, number], multiplier: number): number {
		let baseQuantity: number;
		
		if (typeIs(quantitySpec, "number")) {
			baseQuantity = quantitySpec;
		} else {
			baseQuantity = math.random(quantitySpec[0], quantitySpec[1]);
		}
		
		return math.floor(baseQuantity * multiplier);
	}

	private createLootDrop(itemId: string, quantity: number, position: Vector3): LootDrop | undefined {
		const id = this.generateLootId();
		const now = tick();
		
		const lootDrop: LootDrop = {
			id,
			itemId,
			quantity,
			position,
			timestamp: now,
			expiresAt: now + this.LOOT_EXPIRE_TIME,
		};
		
		this.activeLootDrops.set(id, lootDrop);
		this.createLootModel(lootDrop);
		
		return lootDrop;
	}

	private createLootModel(loot: LootDrop): void {
		// Create a simple loot model in the world
		const lootFolder = Workspace.FindFirstChild("LootDrops") as Folder;
		
		const part = new Instance("Part");
		part.Name = `Loot_${loot.id}`;
		part.Size = new Vector3(1, 1, 1);
		part.Position = loot.position;
		part.Anchored = true;
		part.CanCollide = false;
		part.BrickColor = BrickColor.Green();
		part.Shape = Enum.PartType.Ball;
		part.Material = Enum.Material.Neon;
		
		// Add a click detector for collection
		const clickDetector = new Instance("ClickDetector");
		clickDetector.MaxActivationDistance = 10;
		clickDetector.Parent = part;
		
		part.Parent = lootFolder;
		
		// Add floating animation
		const startPosition = part.Position;
		const connection = game.GetService("RunService").Heartbeat.Connect((deltaTime) => {
			const time = tick();
			const offset = math.sin(time * 2) * 0.5;
			part.Position = startPosition.add(new Vector3(0, offset, 0));
		});
		
		// Store connection for cleanup
		this.lootAnimations.set(loot.id, connection);
	}

	private removeLootModel(lootId: string): void {
		const lootFolder = Workspace.FindFirstChild("LootDrops") as Folder;
		const lootModel = lootFolder.FindFirstChild(`Loot_${lootId}`);
		
		if (lootModel) {
			lootModel.Destroy();
		}
		
		// Clean up animation connection
		const connection = this.lootAnimations.get(lootId);
		if (connection) {
			connection.Disconnect();
			this.lootAnimations.delete(lootId);
		}
	}

	private setupLootFolder(): void {
		let lootFolder = Workspace.FindFirstChild("LootDrops") as Folder;
		if (!lootFolder) {
			lootFolder = new Instance("Folder");
			lootFolder.Name = "LootDrops";
			lootFolder.Parent = Workspace;
		}
	}

	private startCleanupLoop(): void {
		// Clean up expired loot every 10 seconds
		task.spawn(() => {
			while (true) {
				task.wait(10);
				this.cleanupExpiredLoot();
			}
		});
	}

	private cleanupExpiredLoot(): void {
		const now = tick();
		const expiredLoot: string[] = [];
		
		for (const [id, loot] of this.activeLootDrops) {
			if (now >= loot.expiresAt) {
				expiredLoot.push(id);
			}
		}
		
		for (const id of expiredLoot) {
			this.activeLootDrops.delete(id);
			this.removeLootModel(id);
		}
		
		if (expiredLoot.size() > 0) {
			print(`LootService: Cleaned up ${expiredLoot.size()} expired loot drops`);
		}
	}

	private generateLootId(): string {
		return `loot_${this.nextLootId++}`;
	}
}
