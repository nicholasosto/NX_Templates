/**
 * @file StatusEffect.ts
 * @module StatusEffectDefinitions
 * @layer Shared/Definitions
 * @description Defines the structure and types for status effects in the game.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-07-03 by Trembus – Initial creation
 */

export const STATUS_EFFECT_KEYS = [
	"Poisoned",
	"Burning",
	"Frozen",
	"Stunned",
	"Raged",
	"Bleeding",
	"SpeedBoost",
	"Invulnerable",
	"PowerBoost",
	"JumpBoost",
] as const;

export type StatusEffectKey = (typeof STATUS_EFFECT_KEYS)[number];
export interface StatusEffectMeta {
	displayName: string;
	iconId: string; // Asset ID for the icon
	description: string; // Description of the effect
	duration: number; // Duration in seconds
	tickRate: number; // How often the effect applies its logic
	amount: number; // Amount of effect applied per tick
}

export const StatusEffectMeta: Record<StatusEffectKey, StatusEffectMeta> = {
	Poisoned: {
		displayName: "Poisoned",
		iconId: "rbxassetid://12345678", // Placeholder ID
		description: "Takes damage over time.",
		duration: 5,
		tickRate: 1,
		amount: -2,
	},
	Burning: {
		displayName: "Burning",
		iconId: "rbxassetid://23456789", // Placeholder ID
		description: "Takes fire damage over time.",
		duration: 5,
		tickRate: 1,
		amount: -3,
	},
	Frozen: {
		displayName: "Frozen",
		iconId: "rbxassetid://34567890", // Placeholder ID
		description: "Cannot move or attack.",
		duration: 3,
		tickRate: 0.5,
		amount: 0, // No damage, just immobilization
	},
	Stunned: {
		displayName: "Stunned",
		iconId: "rbxassetid://45678901", // Placeholder ID
		description: "Cannot perform actions.",
		duration: 2,
		tickRate: 0.5,
		amount: 0, // No damage, just immobilization
	},
	Raged: {
		displayName: "Raged",
		iconId: "rbxassetid://56789012", // Placeholder ID
		description: "Increases attack power.",
		duration: 5,
		tickRate: 1,
		amount: 5, // Increases damage dealt
	},
	Bleeding: {
		displayName: "Bleeding",
		iconId: "rbxassetid://67890123", // Placeholder ID
		description: "Takes bleeding damage over time.",
		duration: 5,
		tickRate: 1,
		amount: -4,
	},
	SpeedBoost: {
		displayName: "Speed Boost",
		iconId: "rbxassetid://78901234", // Placeholder ID
		description: "Increases movement speed temporarily.",
		duration: 5,
		tickRate: 0.5,
		amount: 10, // Increases movement speed
	},
	Invulnerable: {
		displayName: "Invulnerable",
		iconId: "rbxassetid://89012345", // Placeholder ID
		description: "Cannot take damage.",
		duration: 5,
		tickRate: 0.5,
		amount: 0, // No damage taken
	},
	PowerBoost: {
		displayName: "Power Boost",
		iconId: "rbxassetid://90123456", // Placeholder ID
		description: "Increases damage dealt temporarily.",
		duration: 5,
		tickRate: 0.5,
		amount: 10, // Increases damage dealt
	},
	JumpBoost: {
		displayName: "Jump Boost",
		iconId: "rbxassetid://01234567", // Placeholder ID
		description: "Increases jump height temporarily.",
		duration: 5,
		tickRate: 0.5,
		amount: 5, // Increases jump height
	},
} as const satisfies Record<StatusEffectKey, StatusEffectMeta>;
export type StatusEffect = {
	key: StatusEffectKey;
	meta: StatusEffectMeta;
	startTime: number; // Timestamp when the effect started
	active: boolean; // Whether the effect is currently active
};
export type StatusEffectMap = Map<StatusEffectKey, StatusEffect>;
