/// <reference types="@rbxts/types" />

import { GameImages } from "shared/assets";

/**
 * @file        RarityData.ts
 * @module      Rarity
 * @layer       Shared/Data
 * @description Enum types for gem rarity levels.
 */

/* =============================================== Rarity Data Setup =============================================== */
// RARITY KEYS
export const RARITY_KEYS = ["Common", "Uncommon", "Rare", "Epic", "Legendary"] as const;

// Rarity Key Type
export type RarityKey = (typeof RARITY_KEYS)[number];

// Rarity Metadata Interface
export interface RarityMeta {
	label: string;
	color: Color3;
	BorderImage: string; // Asset ID for the rarity icon
}

// Rarity Metadata Records
export const RarityMeta = {
	Common: {
		label: "Common",
		color: Color3.fromRGB(200, 200, 200),
		BorderImage: GameImages.Borders.GothicMetal,
	},
	Uncommon: {
		label: "Uncommon",
		color: Color3.fromRGB(100, 200, 100),
		BorderImage: GameImages.Borders.GothicMetal,
	},
	Rare: {
		label: "Rare",
		color: Color3.fromRGB(50, 100, 200),
		BorderImage: GameImages.Borders.GothicMetal,
	},
	Epic: {
		label: "Epic",
		color: Color3.fromRGB(200, 50, 200),
		BorderImage: GameImages.Borders.GothicMetal,
	},
	Legendary: {
		label: "Legendary",
		color: Color3.fromRGB(255, 215, 0),
		BorderImage: GameImages.Borders.GothicMetal, // Gold border for legendary
	},
} as const satisfies Record<RarityKey, RarityMeta>;
