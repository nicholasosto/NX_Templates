/**
 * @file        src/server/services/WorldService.ts
 * @module      WorldService
 * @layer       Server
 * @description Service for managing world state, zones, and environmental systems.
 */

import { Workspace } from "@rbxts/services";

interface WorldZone {
	readonly id: string;
	readonly name: string;
	readonly bounds: { min: Vector3; max: Vector3; };
	readonly level: number;
	readonly spawns: Array<{ npcKey: string; spawnRate: number; maxCount: number; }>;
}

export class WorldService {
	private static instance: WorldService;
	private activeZones = new Map<string, WorldZone>();

	private constructor() {
		this.initializeWorld();
	}

	public static getInstance(): WorldService {
		if (!WorldService.instance) {
			WorldService.instance = new WorldService();
		}
		return WorldService.instance;
	}

	/**
	 * Gets the zone a position is in
	 */
	public getZoneAtPosition(position: Vector3): WorldZone | undefined {
		for (const [_, zone] of this.activeZones) {
			const min = zone.bounds.min;
			const max = zone.bounds.max;
			
			if (position.X >= min.X && position.X <= max.X &&
				position.Y >= min.Y && position.Y <= max.Y &&
				position.Z >= min.Z && position.Z <= max.Z) {
				return zone;
			}
		}
		return undefined;
	}

	/**
	 * Registers a new zone
	 */
	public registerZone(zone: WorldZone): void {
		this.activeZones.set(zone.id, zone);
	}

	private initializeWorld(): void {
		// Initialize world zones and systems
		print("WorldService: World initialized");
	}
}
