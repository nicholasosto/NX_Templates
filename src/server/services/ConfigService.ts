/**
 * @file        src/server/services/ConfigService.ts
 * @module      ConfigService
 * @layer       Server
 * @description Service for managing game configuration, settings, and feature flags.
 */

interface GameConfig {
	gameplay: {
		maxLevel: number;
		baseExperiencePerLevel: number;
		respawnTime: number;
		maxInventorySlots: number;
	};
	combat: {
		baseDamageMultiplier: number;
		criticalHitChance: number;
		criticalHitMultiplier: number;
	};
	economy: {
		maxCurrency: number;
		defaultStartingGold: number;
		shopRefreshInterval: number;
	};
	world: {
		maxPlayersPerServer: number;
		worldSize: Vector3;
		spawnPosition: Vector3;
	};
	features: {
		pvpEnabled: boolean;
		tradingEnabled: boolean;
		chatEnabled: boolean;
		debugMode: boolean;
	};
}

export class ConfigService {
	private static instance: ConfigService;
	private config: GameConfig;

	private constructor() {
		this.config = this.loadDefaultConfig();
	}

	public static getInstance(): ConfigService {
		if (!ConfigService.instance) {
			ConfigService.instance = new ConfigService();
		}
		return ConfigService.instance;
	}

	/**
	 * Gets a configuration value by path
	 */
	public get<T>(path: keyof GameConfig): T;
	public get<T>(path: string): T | undefined;
	public get<T>(path: string): T | undefined {
		const parts = path.split(".");
		let current: unknown = this.config;

		for (const part of parts) {
			if (typeIs(current, "table") && current[part as never] !== undefined) {
				current = current[part as never];
			} else {
				return undefined;
			}
		}

		return current as T;
	}

	/**
	 * Sets a configuration value by path
	 */
	public set(path: string, value: unknown): boolean {
		const parts = path.split(".");
		const lastPart = parts.pop();
		
		if (!lastPart) return false;

		let current: Record<string, unknown> = this.config as never;

		// Navigate to the parent object
		for (const part of parts) {
			if (!current[part] || !typeIs(current[part], "table")) {
				current[part] = {};
			}
			current = current[part] as Record<string, unknown>;
		}

		current[lastPart] = value;
		return true;
	}

	/**
	 * Gets the entire configuration object
	 */
	public getAll(): Readonly<GameConfig> {
		return this.config;
	}

	/**
	 * Updates multiple configuration values at once
	 */
	public updateConfig(updates: Partial<GameConfig>): void {
		// Deep merge the updates with the current config
		this.deepMerge(this.config as never, updates as never);
	}

	/**
	 * Resets configuration to defaults
	 */
	public resetToDefaults(): void {
		this.config = this.loadDefaultConfig();
	}

	/**
	 * Checks if a feature is enabled
	 */
	public isFeatureEnabled(feature: keyof GameConfig["features"]): boolean {
		return this.config.features[feature] || false;
	}

	/**
	 * Enables or disables a feature
	 */
	public setFeature(feature: keyof GameConfig["features"], enabled: boolean): void {
		this.config.features[feature] = enabled;
	}

	private loadDefaultConfig(): GameConfig {
		return {
			gameplay: {
				maxLevel: 100,
				baseExperiencePerLevel: 1000,
				respawnTime: 5,
				maxInventorySlots: 50,
			},
			combat: {
				baseDamageMultiplier: 1.0,
				criticalHitChance: 0.05, // 5%
				criticalHitMultiplier: 2.0,
			},
			economy: {
				maxCurrency: 999999999,
				defaultStartingGold: 100,
				shopRefreshInterval: 3600, // 1 hour in seconds
			},
			world: {
				maxPlayersPerServer: 50,
				worldSize: new Vector3(1000, 500, 1000),
				spawnPosition: new Vector3(0, 10, 0),
			},
			features: {
				pvpEnabled: true,
				tradingEnabled: true,
				chatEnabled: true,
				debugMode: false,
			},
		};
	}

	private deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): void {
		for (const [key, value] of pairs(source)) {
			if (typeIs(value, "table") && typeIs(target[key], "table")) {
				this.deepMerge(target[key] as Record<string, unknown>, value as Record<string, unknown>);
			} else {
				target[key] = value;
			}
		}
	}
}
