/// <reference types="@rbxts/types" />

/**
 * @file        GameWindow.ts
 * @module      GameWindow
 * @layer       Client/UI/Molecules
 * @description Panel-based window component with a title bar.
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

import Fusion, { Children, New, OnEvent } from "@rbxts/fusion";
import { BaseContainer } from "./BaseContainer";
import { Players } from "@rbxts/services";
import { GameImages } from "shared/assets";
import { ScreenState } from "client/states";
import { Padding } from "../tokens";
import { ScreenKey } from "shared";

const DEFAULT_WINDOW_SIZE = new UDim2(0.5, 0, 0.5, 0);

export interface GameWindowProps extends Fusion.PropertyTable<Frame> {
	Title?: string;
	ScreenKey: ScreenKey;
	Content?: Fusion.ChildrenValue;
}

export function GameWindow(props: GameWindowProps) {
	props.Name = props.Name ?? "GameWindow";
	props.Size = props.Size ?? DEFAULT_WINDOW_SIZE;
	props.Title = props.Title ?? `${props.ScreenKey} Window`;
	props.AnchorPoint = props.AnchorPoint ?? new Vector2(0.5, 0.5);
	props.Position = props.Position ?? UDim2.fromScale(0.5, 0.5);
	props.Parent = props.Parent ?? Players.LocalPlayer.WaitForChild("PlayerGui");

	/* Title Bar */
	const titleBar = New("TextLabel")({
		Name: "TitleText",
		Size: UDim2.fromScale(1, 0.1),
		Position: UDim2.fromScale(0, 0),
		Text: props.Title,
		BackgroundTransparency: 0.95,
		TextColor3: Color3.fromRGB(255, 255, 255),
		TextStrokeColor3: Color3.fromRGB(0, 0, 0),
		TextStrokeTransparency: 0.5,
		TextSize: 25,
		Font: Enum.Font.SourceSansBold,
		TextXAlignment: Enum.TextXAlignment.Center,
		TextYAlignment: Enum.TextYAlignment.Center,
		[Children]: {},
	});

	/* Window Content */
	const windowContent = BaseContainer({
		Name: "WindowContent",
		Size: UDim2.fromScale(1, 0.9),
		Position: UDim2.fromScale(0, 0.1),
		BackgroundTransparency: 0.1,
		Padding: Padding(4),
		BorderSizePixel: 0,
		ClipsDescendants: true,
		Content: {
			ContainerContents: props.Content ?? {},
		},
	});

	/* Window Container */
	const windowContainer = New("Frame")({
		Name: "WindowContainer",
		Size: props.Size,
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		BackgroundTransparency: 0.2,
		[Children]: {
			Corner: New("UICorner")({
				CornerRadius: new UDim(0, 5),
			}),
			TitleBar: titleBar,
			WindowContent: windowContent,
			CloseButton: New("ImageButton")({
				Name: "CloseButton",
				Size: UDim2.fromOffset(30, 30),
				AnchorPoint: new Vector2(0.5, 0.5),
				Position: UDim2.fromScale(1, 0),
				BackgroundTransparency: 1,
				Image: GameImages.Control.Close,
				[OnEvent("Activated")]: () => ScreenState[props.ScreenKey].set(false),
			}),
		},
	});

	/* Screen GUI */
	const screenGUI = New("ScreenGui")({
		Name: props.Name,
		Parent: props.Parent,
		ResetOnSpawn: false,
		DisplayOrder: 1,
		Enabled: ScreenState[props.ScreenKey],
		[Children]: {
			WindowContainer: windowContainer,
		},
	});

	return screenGUI;
}
