/**
 * @file        src/server/services/PlayerDataService.ts
 * @module      PlayerDataService
 * @layer       Server
 * @description Service for managing player data persistence and profiles.
 */

import { Players, DataStoreService } from "@rbxts/services";

interface PlayerProfile {
	readonly playerId: number;
	readonly playerName: string;
	level: number;
	experience: number;
	currency: Record<string, number>;
	inventory: Array<{ itemId: string; quantity: number }>;
	settings: Record<string, unknown>;
	lastLogin: number;
	totalPlayTime: number;
}

export class PlayerDataService {
	private static instance: PlayerDataService;
	private dataStore = DataStoreService.GetDataStore("PlayerProfiles");
	private playerProfiles = new Map<number, PlayerProfile>();
	private sessionStartTimes = new Map<number, number>();

	private constructor() {
		this.setupPlayerEvents();
	}

	public static getInstance(): PlayerDataService {
		if (!PlayerDataService.instance) {
			PlayerDataService.instance = new PlayerDataService();
		}
		return PlayerDataService.instance;
	}

	/**
	 * Loads player data when they join
	 */
	public async loadPlayerData(player: Player): Promise<PlayerProfile | undefined> {
		try {
			const [savedData] = await this.dataStore.GetAsync(`Player_${player.UserId}`);
			
			let profile: PlayerProfile;
			
			if (savedData) {
				// Player has existing data
				profile = savedData as PlayerProfile;
				profile.lastLogin = tick();
				print(`PlayerDataService: Loaded existing data for ${player.Name}`);
			} else {
				// New player - create default profile
				profile = this.createDefaultProfile(player);
				print(`PlayerDataService: Created new profile for ${player.Name}`);
			}

			this.playerProfiles.set(player.UserId, profile);
			this.sessionStartTimes.set(player.UserId, tick());
			
			return profile;
		} catch (error) {
			warn(`PlayerDataService: Failed to load data for ${player.Name}: ${error}`);
			return undefined;
		}
	}

	/**
	 * Saves player data to DataStore
	 */
	public async savePlayerData(player: Player): Promise<boolean> {
		const profile = this.playerProfiles.get(player.UserId);
		if (!profile) {
			warn(`PlayerDataService: No profile found for ${player.Name}`);
			return false;
		}

		// Update play time
		this.updatePlayTime(player);

		try {
			await this.dataStore.SetAsync(`Player_${player.UserId}`, profile);
			print(`PlayerDataService: Saved data for ${player.Name}`);
			return true;
		} catch (error) {
			warn(`PlayerDataService: Failed to save data for ${player.Name}: ${error}`);
			return false;
		}
	}

	/**
	 * Gets a player's profile
	 */
	public getPlayerProfile(player: Player): PlayerProfile | undefined {
		return this.playerProfiles.get(player.UserId);
	}

	/**
	 * Updates a player's currency
	 */
	public modifyPlayerCurrency(player: Player, currencyType: string, amount: number): boolean {
		const profile = this.playerProfiles.get(player.UserId);
		if (!profile) return false;

		if (!profile.currency[currencyType]) {
			profile.currency[currencyType] = 0;
		}

		profile.currency[currencyType] = math.max(0, profile.currency[currencyType] + amount);
		return true;
	}

	/**
	 * Checks if player has enough currency
	 */
	public hasEnoughCurrency(player: Player, currencyType: string, amount: number): boolean {
		const profile = this.playerProfiles.get(player.UserId);
		if (!profile) return false;

		return (profile.currency[currencyType] || 0) >= amount;
	}

	private createDefaultProfile(player: Player): PlayerProfile {
		return {
			playerId: player.UserId,
			playerName: player.Name,
			level: 1,
			experience: 0,
			currency: {
				gold: 100,
				gems: 10,
			},
			inventory: [],
			settings: {},
			lastLogin: tick(),
			totalPlayTime: 0,
		};
	}

	private updatePlayTime(player: Player): void {
		const profile = this.playerProfiles.get(player.UserId);
		const sessionStart = this.sessionStartTimes.get(player.UserId);
		
		if (profile && sessionStart) {
			const sessionTime = tick() - sessionStart;
			profile.totalPlayTime += sessionTime;
			this.sessionStartTimes.set(player.UserId, tick()); // Reset session start
		}
	}

	private setupPlayerEvents(): void {
		Players.PlayerAdded.Connect((player) => {
			this.loadPlayerData(player);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.savePlayerData(player);
			this.playerProfiles.delete(player.UserId);
			this.sessionStartTimes.delete(player.UserId);
		});
	}
}
