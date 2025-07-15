/**
 * @file        src/server/services/NPCService.ts
 * @module      NPCService
 * @layer       Server
 * @description Service for managing NPC spawning, behavior, and lifecycle.
 */

import { ReplicatedStorage, Workspace, RunService } from "@rbxts/services";
import { NPC_KEYS, NPCKey, NPCMeta, NPCMetaMap } from "shared/definitions/NPC";
import type { LootTableKey } from "shared/definitions/Loot";

interface SpawnedNPC {
	readonly id: string;
	readonly npcKey: NPCKey;
	readonly model: Model;
	readonly spawned: number;
	health: number;
	maxHealth: number;
	isAlive: boolean;
	position: Vector3;
}

export class NPCService {
	private static instance: NPCService;
	private spawnedNPCs = new Map<string, SpawnedNPC>();
	private nextNPCId = 1;

	private constructor() {
		this.setupNPCFolder();
	}

	public static getInstance(): NPCService {
		if (!NPCService.instance) {
			NPCService.instance = new NPCService();
		}
		return NPCService.instance;
	}

	/**
	 * Spawns an NPC at the specified position
	 */
	public spawnNPC(npcKey: NPCKey, position: Vector3): SpawnedNPC | undefined {
		const meta = this.getNPCMeta(npcKey);
		if (!meta) {
			warn(`NPCService: Unknown NPC key: ${npcKey}`);
			return undefined;
		}

		const model = this.createNPCModel(meta, position);
		if (!model) {
			warn(`NPCService: Failed to create model for NPC: ${npcKey}`);
			return undefined;
		}

		const id = this.generateNPCId();
		const spawnedNPC: SpawnedNPC = {
			id,
			npcKey,
			model,
			spawned: tick(),
			health: meta.baseStats.maxHealth,
			maxHealth: meta.baseStats.maxHealth,
			isAlive: true,
			position: position,
		};

		this.spawnedNPCs.set(id, spawnedNPC);
		this.setupNPCBehavior(spawnedNPC);

		return spawnedNPC;
	}

	/**
	 * Removes an NPC from the game
	 */
	public despawnNPC(npcId: string): boolean {
		const npc = this.spawnedNPCs.get(npcId);
		if (!npc) {
			return false;
		}

		npc.model.Destroy();
		this.spawnedNPCs.delete(npcId);
		return true;
	}

	/**
	 * Gets all spawned NPCs
	 */
	public getAllSpawnedNPCs(): ReadonlyMap<string, SpawnedNPC> {
		return this.spawnedNPCs;
	}

	/**
	 * Gets a specific spawned NPC by ID
	 */
	public getSpawnedNPC(npcId: string): SpawnedNPC | undefined {
		return this.spawnedNPCs.get(npcId);
	}

	/**
	 * Damages an NPC and handles death if health reaches 0
	 */
	public damageNPC(npcId: string, damage: number): boolean {
		const npc = this.spawnedNPCs.get(npcId);
		if (!npc || !npc.isAlive) {
			return false;
		}

		npc.health = math.max(0, npc.health - damage);
		
		if (npc.health <= 0) {
			this.handleNPCDeath(npc);
		}

		return true;
	}

	/**
	 * Gets NPC metadata by key
	 */
	public getNPCMeta(npcKey: NPCKey): NPCMeta | undefined {
		return NPCMetaMap[npcKey];
	}

	/**
	 * Gets all available NPC keys
	 */
	public getAvailableNPCKeys(): readonly NPCKey[] {
		return NPC_KEYS;
	}

	private setupNPCFolder(): void {
		let npcFolder = Workspace.FindFirstChild("NPCs") as Folder;
		if (!npcFolder) {
			npcFolder = new Instance("Folder");
			npcFolder.Name = "NPCs";
			npcFolder.Parent = Workspace;
		}
	}

	private createNPCModel(meta: NPCMeta, position: Vector3): Model | undefined {
		try {
			const template = meta.modelTemplate;
			const model = template.Clone() as Model;
			
			if (model.PrimaryPart) {
				model.SetPrimaryPartCFrame(new CFrame(position));
			}
			
			const npcFolder = Workspace.FindFirstChild("NPCs") as Folder;
			model.Parent = npcFolder;
			
			return model;
		} catch (error) {
			warn(`NPCService: Error creating NPC model: ${error}`);
			return undefined;
		}
	}

	private setupNPCBehavior(npc: SpawnedNPC): void {
		// Add basic NPC behavior here
		// This could include AI movement, attack patterns, etc.
		
		// Example: Basic wandering behavior
		const connection = RunService.Heartbeat.Connect(() => {
			if (!npc.isAlive) {
				connection.Disconnect();
				return;
			}
			
			// Add NPC behavior logic here
		});
	}

	private handleNPCDeath(npc: SpawnedNPC): void {
		npc.isAlive = false;
		
		// Handle loot drops
		const meta = this.getNPCMeta(npc.npcKey);
		if (meta?.lootTable) {
			this.dropLoot(npc, meta.lootTable);
		}
		
		// Schedule cleanup
		task.wait(5); // Wait 5 seconds before cleanup
		this.despawnNPC(npc.id);
	}

	private dropLoot(npc: SpawnedNPC, lootTable: LootTableKey): void {
		// This would integrate with LootService
		// For now, just a placeholder
		print(`NPC ${npc.npcKey} dropped loot from table: ${lootTable}`);
	}

	private generateNPCId(): string {
		return `npc_${this.nextNPCId++}`;
	}
}
