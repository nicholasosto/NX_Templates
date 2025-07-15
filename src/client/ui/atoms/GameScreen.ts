/// <reference types="@rbxts/types" />

/**
 * @file        GameScreen.ts
 * @module      GameScreen
 * @layer       Client/UI/Atoms
 * @description Base ScreenGui container with standard defaults.
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
// #AGENT_ATOM

import Fusion, { Children, New, PropertyTable } from "@rbxts/fusion";
import { Players } from "@rbxts/services";

export interface GameScreenProps extends PropertyTable<ScreenGui> {
	Content?: Fusion.ChildrenValue;
}

export const GameScreen = (props: GameScreenProps) => {
	props.Name = props.Name ?? "GameScreen";
	props.DisplayOrder = props.DisplayOrder ?? 1000;
	props.ResetOnSpawn = props.ResetOnSpawn ?? false;
	props.Enabled = props.Enabled ?? true;
	const parent = props.Parent ?? Players.LocalPlayer.WaitForChild("PlayerGui");

	return New("ScreenGui")({
		Name: props.Name,
		DisplayOrder: props.DisplayOrder,
		ResetOnSpawn: props.ResetOnSpawn,
		Enabled: props.Enabled,
		Parent: parent,
		IgnoreGuiInset: props.IgnoreGuiInset ?? false,
		[Children]: props.Content ?? {},
	});
};
