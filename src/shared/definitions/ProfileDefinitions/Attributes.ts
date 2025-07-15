/// <reference types="@rbxts/types" />

/**
 * @file        AttributeData.ts
 * @module      AttributesDefinitions
 * @author      Trembus
 * @layer       Constants
 * @description Canonical list of character attributes, their metadata,
 *              and strongly-typed helpers for default values & validation.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 */

// Attribute Keys
export const ATTR_KEYS = ["str", "agi", "vit", "int", "lck"] as const;

// Key Type
export type AttributeKey = (typeof ATTR_KEYS)[number];

// Attribute Map Type
export type AttributesMap = Record<AttributeKey, number>;

// Data Transfer Object for Attributes
export interface AttributesDTO extends AttributesMap {
	AvailablePoints: number; // Total available points for distribution
	SpentPoints: number; // Total points spent on attributes
}

// Attribute Metadata Interface
export interface AttributeMeta {
	displayName: string;
	iconId: string;
	min: number;
	max: number;
}

// Attribute Metadata Records
export const AttributesMeta = {
	str: { displayName: "Strength", iconId: "rbxassetid://127745571044516", min: 1, max: 999 },
	agi: { displayName: "Agility", iconId: "rbxassetid://73893872719367", min: 1, max: 999 },
	vit: { displayName: "Vitality", iconId: "rbxassetid://121291227474039", min: 1, max: 999 },
	int: { displayName: "Intellect", iconId: "rbxassetid://107600003376684", min: 1, max: 999 },
	lck: { displayName: "Luck", iconId: "rbxassetid://114767496083209", min: 1, max: 999 },
} as const satisfies Record<AttributeKey, AttributeMeta>;

// Default attributes with initial values
export const DefaultAttributes: AttributesDTO = {
	AvailablePoints: 5,
	SpentPoints: 0,
	...ATTR_KEYS.reduce<AttributesMap>((obj, key) => {
		obj[key] = 10;
		return obj;
	}, {} as AttributesMap),
};

// Helper Functions

/** Clamp a single attribute into meta-defined bounds. */
export function clampAttr(key: AttributeKey, value: number): number {
	const { min, max } = AttributesMeta[key];
	return math.clamp(value, min, max); // Roblox math API
}

/** Produce a fresh default map, optionally overriding some keys. */
export function createAttributes(partial?: Partial<AttributesDTO>): AttributesDTO {
	return {
		...DefaultAttributes,
		...partial,
	};
}
