/**
 * @file        src/shared/definitions/PanelSlots/index.ts
 * @module      PanelSlots
 * @layer       Shared/Definitions
 * @description Definitions for panel slots used in the UI.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-02 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

export const GEM_SLOT_KEYS = ["FORM", "ABILITY", "PHYSICAL", "SUMMON"] as const;
export type GemSlotKey = (typeof GEM_SLOT_KEYS)[number];
export const GEM_SLOT_META: Record<GemSlotKey, { displayName: string; iconId: string }> = {
	FORM: { displayName: "Form Gem", iconId: "rbxassetid://132994920207160" },
	ABILITY: { displayName: "Ability Gem", iconId: "rbxassetid://73537063487999" },
	PHYSICAL: { displayName: "Physical Gem", iconId: "rbxassetid://107324366070907" },
	SUMMON: { displayName: "Magical Gem", iconId: "rbxassetid://104883948460103" },
};
