/// <reference types="@rbxts/types" />

/**
 * @file        AbilitySlice.ts
 * @module      AbilitySlice
 * @layer       Client/State
 * @description Reactive container tracking the player's equipped abilities.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import { Value } from "@rbxts/fusion";
import { AbilityKey } from "shared/definitions";

export default class AbilitySlice {
	/** Reactive list of equipped abilities */
	public readonly Abilities = Value<AbilityKey[]>([]);

	constructor() {
		print("AbilitySlice initialized");
	}

	/** Replace the ability list and notify the server */
	public UpdateAbilities(list: AbilityKey[]) {
		warn("AbilitySlice: Updating abilities to", list);
		this.Abilities.set(list);
	}
}
