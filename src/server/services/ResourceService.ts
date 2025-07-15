/**
 * @file        src/server/services/ResourceService.ts
 * @module      ResourceService
 * @layer       Server
 * @description Service for managing player resources (health, mana, stamina, etc.).
 */

import { Players } from "@rbxts/services";
import { RESOURCE_KEYS, ResourceKey, ResourceMeta, ResourceMeta as ResourceMetaRecord, DEFAULT_RESOURCES } from "shared/definitions/Resources";

interface PlayerResources {
	readonly playerId: number;
	readonly resources: Map<ResourceKey, number>;
	readonly maxResources: Map<ResourceKey, number>;
	readonly lastUpdated: number;
}

export class ResourceService {
	private static instance: ResourceService;
	private playerResources = new Map<number, PlayerResources>();

	private constructor() {
		this.setupPlayerEvents();
	}

	public static getInstance(): ResourceService {
		if (!ResourceService.instance) {
			ResourceService.instance = new ResourceService();
		}
		return ResourceService.instance;
	}

	/**
	 * Initializes resources for a new player
	 */
	public initializePlayerResources(player: Player): void {
		const resources = new Map<ResourceKey, number>();
		const maxResources = new Map<ResourceKey, number>();

		// Initialize all resources to their default values
		for (const resourceKey of RESOURCE_KEYS) {
			const defaultData = DEFAULT_RESOURCES[resourceKey];
			if (defaultData) {
				resources.set(resourceKey, defaultData.current);
				maxResources.set(resourceKey, defaultData.max);
			}
		}

		const playerResourceData: PlayerResources = {
			playerId: player.UserId,
			resources,
			maxResources,
			lastUpdated: tick(),
		};

		this.playerResources.set(player.UserId, playerResourceData);
		print(`ResourceService: Initialized resources for ${player.Name}`);
	}

	/**
	 * Gets current value of a specific resource for a player
	 */
	public getPlayerResource(player: Player, resourceKey: ResourceKey): number | undefined {
		const playerData = this.playerResources.get(player.UserId);
		if (!playerData) {
			warn(`ResourceService: No resource data found for player ${player.Name}`);
			return undefined;
		}

		return playerData.resources.get(resourceKey);
	}

	/**
	 * Gets maximum value of a specific resource for a player
	 */
	public getPlayerMaxResource(player: Player, resourceKey: ResourceKey): number | undefined {
		const playerData = this.playerResources.get(player.UserId);
		if (!playerData) {
			return undefined;
		}

		return playerData.maxResources.get(resourceKey);
	}

	/**
	 * Sets a player's resource to a specific value
	 */
	public setPlayerResource(player: Player, resourceKey: ResourceKey, value: number): boolean {
		const playerData = this.playerResources.get(player.UserId);
		if (!playerData) {
			return false;
		}

		const maxValue = playerData.maxResources.get(resourceKey);
		if (maxValue === undefined) {
			return false;
		}

		// Clamp value between 0 and max
		const clampedValue = math.max(0, math.min(value, maxValue));
		playerData.resources.set(resourceKey, clampedValue);
		
		// Update timestamp
		const newPlayerData = {
			...playerData,
			lastUpdated: tick(),
		};
		this.playerResources.set(player.UserId, newPlayerData);

		// Fire events or update UI here
		this.onResourceChanged(player, resourceKey, clampedValue, maxValue);

		return true;
	}

	/**
	 * Modifies a player's resource by a delta amount
	 */
	public modifyPlayerResource(player: Player, resourceKey: ResourceKey, delta: number): boolean {
		const currentValue = this.getPlayerResource(player, resourceKey);
		if (currentValue === undefined) {
			return false;
		}

		return this.setPlayerResource(player, resourceKey, currentValue + delta);
	}

	/**
	 * Sets the maximum value for a player's resource
	 */
	public setPlayerMaxResource(player: Player, resourceKey: ResourceKey, maxValue: number): boolean {
		const playerData = this.playerResources.get(player.UserId);
		if (!playerData) {
			return false;
		}

		playerData.maxResources.set(resourceKey, maxValue);
		
		// Ensure current value doesn't exceed new max
		const currentValue = playerData.resources.get(resourceKey);
		if (currentValue !== undefined && currentValue > maxValue) {
			playerData.resources.set(resourceKey, maxValue);
		}

		// Update timestamp
		const newPlayerData = {
			...playerData,
			lastUpdated: tick(),
		};
		this.playerResources.set(player.UserId, newPlayerData);

		return true;
	}

	/**
	 * Gets all resources for a player
	 */
	public getAllPlayerResources(player: Player): ReadonlyMap<ResourceKey, number> | undefined {
		const playerData = this.playerResources.get(player.UserId);
		if (!playerData) {
			return undefined;
		}

		return playerData.resources;
	}

	/**
	 * Gets all max resources for a player
	 */
	public getAllPlayerMaxResources(player: Player): ReadonlyMap<ResourceKey, number> | undefined {
		const playerData = this.playerResources.get(player.UserId);
		if (!playerData) {
			return undefined;
		}

		return playerData.maxResources;
	}

	/**
	 * Checks if a player has enough of a specific resource
	 */
	public hasEnoughResource(player: Player, resourceKey: ResourceKey, requiredAmount: number): boolean {
		const currentAmount = this.getPlayerResource(player, resourceKey);
		return currentAmount !== undefined && currentAmount >= requiredAmount;
	}

	/**
	 * Consumes a specific amount of a resource (subtracts from current)
	 */
	public consumeResource(player: Player, resourceKey: ResourceKey, amount: number): boolean {
		if (!this.hasEnoughResource(player, resourceKey, amount)) {
			return false;
		}

		return this.modifyPlayerResource(player, resourceKey, -amount);
	}

	/**
	 * Restores a player's resource to its maximum value
	 */
	public restoreResource(player: Player, resourceKey: ResourceKey): boolean {
		const maxValue = this.getPlayerMaxResource(player, resourceKey);
		if (maxValue === undefined) {
			return false;
		}

		return this.setPlayerResource(player, resourceKey, maxValue);
	}

	/**
	 * Gets resource metadata by key
	 */
	public getResourceMeta(resourceKey: ResourceKey): ResourceMeta | undefined {
		return ResourceMetaRecord[resourceKey];
	}

	/**
	 * Gets all available resource keys
	 */
	public getAvailableResourceKeys(): readonly ResourceKey[] {
		return RESOURCE_KEYS;
	}

	/**
	 * Cleans up resources when a player leaves
	 */
	public cleanupPlayer(player: Player): void {
		this.playerResources.delete(player.UserId);
		print(`ResourceService: Cleaned up resources for ${player.Name}`);
	}

	private setupPlayerEvents(): void {
		Players.PlayerAdded.Connect((player) => {
			this.initializePlayerResources(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.cleanupPlayer(player);
		});
	}

	private onResourceChanged(player: Player, resourceKey: ResourceKey, newValue: number, maxValue: number): void {
		// This is where you would fire events to update UI, save data, etc.
		// For now, just a debug print
		const percentage = math.floor((newValue / maxValue) * 100);
		print(`${player.Name}'s ${resourceKey}: ${newValue}/${maxValue} (${percentage}%)`);

		// Handle special cases
		const meta = this.getResourceMeta(resourceKey);
		if (meta) {
			// Check for resource depletion
			if (newValue <= 0) {
				this.handleResourceDepletion(player, resourceKey);
			}

			// Check for critical thresholds
			if (newValue / maxValue <= 0.2) { // 20% or below
				this.handleLowResource(player, resourceKey);
			}
		}
	}

	private handleResourceDepletion(player: Player, resourceKey: ResourceKey): void {
		print(`${player.Name}'s ${resourceKey} is depleted!`);
		
		// Handle specific resource depletion effects
		switch (resourceKey) {
			case "Health":
				// Player death logic would go here
				print(`${player.Name} has died!`);
				break;
			case "Mana":
				// Prevent spell casting
				print(`${player.Name} is out of mana!`);
				break;
			case "Stamina":
				// Prevent running/abilities
				print(`${player.Name} is exhausted!`);
				break;
		}
	}

	private handleLowResource(player: Player, resourceKey: ResourceKey): void {
		// Handle low resource warnings/effects
		print(`${player.Name}'s ${resourceKey} is running low!`);
	}
}
