/// <reference types="@rbxts/types" />

/**
 * @file        Progression.ts
 * @module      Progression
 * @layer       Shared/Definitions/Profile
 * @description Defines the progression system for player profiles.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 */

export const PROGRESSION_KEYS = ["Level", "Experience"] as const;
export type ProgressionKey = (typeof PROGRESSION_KEYS)[number];
export interface ProgressionMap {
	Level: number; // Player's current level
	Experience: number; // Player's current experience points
}
export interface ProgressionDTO extends ProgressionMap {
	NextLevelExperience: number; // Experience required for the next level
}
export const DefaultProgression: ProgressionDTO = {
	Level: 1,
	Experience: 0,
	NextLevelExperience: 100, // Default experience required for the next level
};
export const ProgressionMeta: Record<ProgressionKey, { displayName: string; iconId: string }> = {
	Level: { displayName: "Level", iconId: "rbxassetid://1234567890" }, // Replace with actual icon ID
	Experience: { displayName: "Experience", iconId: "rbxassetid://1234567891" }, // Replace with actual icon ID
} as const satisfies Record<ProgressionKey, { displayName: string; iconId: string }>;

export function getNextLevelExperience(level: number): number {
	// Simple formula for next level experience, can be adjusted as needed
	return 100 + (level - 1) * 50; // Example: 100 for level 1, 150 for level 2, etc.
}
