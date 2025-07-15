/// <reference types="@rbxts/types" />

/**
 * @file        ResourceData.ts
 * @module      ResourceData
 * @author      Trembus
 * @license     MIT
 * @layer       Constants
 * @description Canonical list of character Resources, their metadata,
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 *
 * @dependencies
 *   shared/assets
 */

import { Computed, Value } from "@rbxts/fusion";
import { GameImages } from "shared/assets";
import { Gradients } from "shared/constants/gradients";

// Resource Keys
export const RESOURCE_KEYS = ["Health", "Mana", "Stamina"] as const;
const { HealthGradient, OceanGradient, GlassGradient } = Gradients;

// Resource Types
export type ResourceKey = (typeof RESOURCE_KEYS)[number];

// Resource Metadata Interface
export interface ResourceMeta {
	displayName: string;
	iconId: string; // Asset ID for the resource icon
	gradient: UIGradient; // Color for the resource bar
	layoutOrder: number; // Optional layout order for UI elements
}

// Resource Metadata Records
export const ResourceMeta: Record<ResourceKey, ResourceMeta> = {
	Health: {
		displayName: "Health",
		iconId: GameImages.Attributes.Vitality, // Use the Vitality icon for Health
		gradient: HealthGradient(), // Use the HealthGradient for Health
		layoutOrder: 1,
	},
	Mana: {
		displayName: "Mana",
		iconId: GameImages.Attributes.Intelligence, // Use the Intelligence icon for Mana
		gradient: OceanGradient(),
		layoutOrder: 2,
	},
	Stamina: {
		displayName: "Stamina",
		iconId: GameImages.Attributes.Dexterity, // Use the Dexterity icon for Stamina
		gradient: GlassGradient(),
		layoutOrder: 3,
	},
} satisfies Record<ResourceKey, ResourceMeta>;

export interface ResourceDTO {
	current: number;
	max: number;
	// optional fields
	regenPerSecond?: number;
	// timestamp for last regen tick, status flags, etc.
}

export type ResourceDataMap = {
	[Key in ResourceKey]: ResourceDTO;
};

export const DEFAULT_RESOURCES: ResourceDataMap = {
	Health: { current: 100, max: 100, regenPerSecond: 2 },
	Mana: { current: 90, max: 90, regenPerSecond: 5 },
	Stamina: { current: 95, max: 95, regenPerSecond: 10 },
} as const;

/** Type-safe lookup: returns meta & dto bundled for convenience */
export function getResourceBundle(key: ResourceKey) {
	return {
		key,
		meta: ResourceMeta[key],
		data: DEFAULT_RESOURCES[key],
	};
}
