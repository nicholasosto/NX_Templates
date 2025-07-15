/// <reference types="@rbxts/types" />

/**
 * @file        GameText.ts
 * @module      GameText
 * @layer       Client/UI/Atoms
 * @description Styled text label with hover-state bolding.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-08 by Codex – Header added
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Computed, OnEvent, Value } from "@rbxts/fusion";
import { useToken } from "theme/hooks";

export interface GameTextProps extends Fusion.PropertyTable<TextLabel> {
	ShadowBox?: boolean;
	Title?: boolean;
	TextState: Value<string> | Value<number> | Computed<string> | Computed<number>;
}

export function GameText(props: GameTextProps): TextLabel {
	const HoveredState = Value(false);
	const colour = props.TextColor3 ?? useToken("textPrimary");
	const regularFont = new Font("SourceSans", Enum.FontWeight.Regular, Enum.FontStyle.Normal);
	const boldFont = new Font("SourceSans", Enum.FontWeight.Bold, Enum.FontStyle.Normal);
	const font = Computed(() => {
		if (HoveredState.get() || props.Title) {
			return boldFont;
		}
		return regularFont;
	});

	const GameTextComponent = Fusion.New("TextLabel")({
		Name: props.Name ?? "GameText",
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? UDim2.fromScale(0.5, 0.5),
		Size: props.Size ?? UDim2.fromScale(0.95, 0.95),
		TextColor3: colour,
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		Text: Computed(() => tostring(props.TextState.get())),
		TextSize: props.TextSize ?? 14,
		TextScaled: props.TextScaled ?? true,
		TextStrokeTransparency: props.TextStrokeTransparency ?? 0.5,
		ZIndex: props.ZIndex ?? 1,
		LayoutOrder: props.LayoutOrder ?? 0,
		/* TextStroke properties */
		//...TextStrokeProps,
		[OnEvent("MouseEnter")]: () => HoveredState.set(true),
		[OnEvent("MouseLeave")]: () => HoveredState.set(false),
	});

	return GameTextComponent;
}
