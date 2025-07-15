/**
 * @file        src/client/states/ScreenState.ts
 * @module      ScreenState
 * @layer       Client/State
 * @description Manages the visibility state of various game screens.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 * @author       Codex
 * @license      MIT
 */

import { Value } from "@rbxts/fusion";
import { SCREEN_KEYS, ScreenKey } from "shared/definitions/Screen";

export type ScreenOrder = Record<ScreenKey, number>;
export type ScreenMap = Record<ScreenKey, Value<boolean>>;
export const ScreenState: ScreenMap = {
	Settings: Value(false),
	Inventory: Value(false),
	Character: Value(false),
	Quests: Value(false),
	Shop: Value(false),
	Teleport: Value(false),
	GemForge: Value(false),
	Developer: Value(false),
} satisfies ScreenMap;

export const ScreenOrder: ScreenOrder = {
	Settings: 1,
	Inventory: 2,
	Character: 3,
	Quests: 4,
	Shop: 5,
	Teleport: 6,
	GemForge: 7,
	Developer: 8,
} satisfies ScreenOrder;

/**
 * Sets the given screen to visible while hiding all others.
 *
 * @param key - Screen to show.
 */
export function ShowScreen(key: ScreenKey) {
	for (const screenKey of SCREEN_KEYS) {
		ScreenState[screenKey].set(screenKey === key);
	}
}
