/// <reference types="@rbxts/types" />

/**
 * @file        PlayerState.ts
 * @module      PlayerState
 * @layer       Client/State
 * @description Lightweight wrapper exposing client state slices.
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

/* Non-Slice Imports */
import { Value } from "@rbxts/fusion";
import { StatusEffect } from "shared/definitions/StatusEffect";
import { Players } from "@rbxts/services";
/* Slices */
import AbilitySlice from "./AbilitySlice";
import ResourceSlice from "./ResourceSlice";
import AttributesSlice from "./AttributesSlice";
import ProgressionSlice from "./ProgressionSlice";
import CurrencySlice from "./CurrencySlice";
import SettingsSlice from "./SettingsState";

/* Player State Wrapper */
class PlayerStateClass {
	private static instance: PlayerStateClass;
	public readonly Abilities = new AbilitySlice();
	public readonly Resources = new ResourceSlice();
	public readonly Attributes = new AttributesSlice();
	public readonly Progression = new ProgressionSlice();
	public readonly Settings = new SettingsSlice();
	public readonly Currency = new CurrencySlice();

	/** Active status effects */
	public StatusEffects = Value<StatusEffect[]>([]);

	constructor(player: Player = Players.LocalPlayer) {
		warn("PlayerState created: ", player.Name);
		if (PlayerStateClass.instance) {
			return PlayerStateClass.instance;
		}
	}
}

export const PlayerStateInstance = new PlayerStateClass();
