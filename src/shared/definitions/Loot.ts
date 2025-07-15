/**
 * @file        LootTableDefinitions.ts
 * @module      DataDefinitions/LootTables
 * @layer       Shared
 * @description Static catalogue of weighted loot tables.
 */

import { CurrencyKey } from "./ProfileDefinitions/Currency"; // optional: gold, gems, etc.
type ItemKey = string; // replace with actual item keys from your game

/*───────────────────────────────────────────────────────────────────────────*\
   1️⃣  Canonical list of loot-table keys
\*───────────────────────────────────────────────────────────────────────────*/
export const LOOT_TABLE_KEYS = [
	"ZOMBIE_COMMON",
	"GOBLIN_ELITE",
	"SKELETON_COMMON",
	"CRYSTAL_GOLEM",
	"WORLD_BOSS",
] as const;

export type LootTableKey = (typeof LOOT_TABLE_KEYS)[number];

/*───────────────────────────────────────────────────────────────────────────*\
   2️⃣  Metadata interfaces
\*───────────────────────────────────────────────────────────────────────────*/
/** Single weighted entry inside a loot table */
export interface LootEntry {
	/** What drops (an item key, currency key, etc.) */
	drop: ItemKey | CurrencyKey;
	/** How many units, or [min, max] for a random range */
	quantity: number | readonly [min: number, max: number];
	/** Relative weight for roll-picking (higher = more likely) */
	weight: number;
	/** Optional: only drop once per table roll */
	unique?: true;
}

/** Compile-time description of an entire loot table */
export interface LootTableMeta {
	/** Rolls to perform when this table is executed */
	rolls: readonly [minRolls: number, maxRolls: number];
	/** Weighted entries */
	entries: readonly LootEntry[];
	/** Optional guaranteed drops (bypass RNG) */
	guaranteed?: readonly Omit<LootEntry, "weight">[];
}

export const LootTableMetaMap = {
	/*───────────────────────────────────────────────────────────────
    Goblin trash mobs – nothing fancy
  ───────────────────────────────────────────────────────────────*/
	ZOMBIE_COMMON: {
		rolls: [1, 2],
		entries: [
			{ drop: "COPPER_COIN", quantity: [3, 8], weight: 50 },
			{ drop: "TATTERED_CLOTH", quantity: [1, 2], weight: 20 },
			{ drop: "SMALL_HEALTH_POTION", quantity: 1, weight: 10 },
			{ drop: "GOBLIN_EAR", quantity: 1, weight: 20 }, // quest item
		],
	},

	/*───────────────────────────────────────────────────────────────
    Goblin elites – rare crafting mats & better potions
  ───────────────────────────────────────────────────────────────*/
	GOBLIN_ELITE: {
		rolls: [2, 3],
		guaranteed: [{ drop: "COPPER_COIN", quantity: [5, 12] }],
		entries: [
			{ drop: "IRON_INGOT", quantity: 1, weight: 30 },
			{ drop: "MEDIUM_HEALTH_POTION", quantity: 1, weight: 15 },
			{ drop: "GOBLIN_RUNE_FRAGMENT", quantity: 1, weight: 5 },
		],
	},

	/*───────────────────────────────────────────────────────────────
    Skeletons – bones & necrotic dust
  ───────────────────────────────────────────────────────────────*/
	SKELETON_COMMON: {
		rolls: [1, 2],
		entries: [
			{ drop: "BONE_SHARD", quantity: [2, 5], weight: 50 },
			{ drop: "NECROTIC_DUST", quantity: 1, weight: 15 },
			{ drop: "SMALL_MANA_POTION", quantity: 1, weight: 10 },
			{ drop: "CRACKED_RIB", quantity: 1, weight: 25 }, // crafting
		],
	},

	/*───────────────────────────────────────────────────────────────
    Crystal Golem – high-value core
  ───────────────────────────────────────────────────────────────*/
	CRYSTAL_GOLEM: {
		rolls: [2, 4],
		guaranteed: [{ drop: "GOLEM_CORE", quantity: 1 }],
		entries: [
			{ drop: "AZURE_CRYSTAL", quantity: [1, 3], weight: 40 },
			{ drop: "MYSTIC_DUST", quantity: [2, 4], weight: 30 },
			{ drop: "LARGE_MANA_POTION", quantity: 1, weight: 20 },
			{ drop: "PRISMATIC_SHARD", quantity: 1, weight: 10 },
		],
	},

	/*───────────────────────────────────────────────────────────────
    World-boss cache – many rolls, rare legendaries
  ───────────────────────────────────────────────────────────────*/
	WORLD_BOSS: {
		rolls: [5, 7],
		guaranteed: [{ drop: "GOLD_COIN", quantity: [50, 100] }],
		entries: [
			{ drop: "LEGENDARY_WEAPON_TOKEN", quantity: 1, weight: 2, unique: true },
			{ drop: "EPIC_GEM", quantity: 1, weight: 10 },
			{ drop: "RARE_GEM", quantity: 1, weight: 25 },
			{ drop: "AZURE_CRYSTAL", quantity: [3, 6], weight: 30 },
			{ drop: "MYTHIC_SCROLL_FRAGMENT", quantity: 1, weight: 8 },
			{ drop: "LARGE_HEALTH_POTION", quantity: 2, weight: 25 },
		],
	},
} as const satisfies Record<LootTableKey, LootTableMeta>;
