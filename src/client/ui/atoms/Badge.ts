/// <reference types="@rbxts/types" />

/**
 * @file        Badge.ts
 * @module      Badge
 * @layer       Client/UI/Atoms
 * @description Displays a small badge with an icon and text, typically used for notifications or status indicators.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-09 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { Children, Computed, New, OnEvent, PropertyTable, Value } from "@rbxts/fusion";

export interface BadgeProps extends PropertyTable<TextButton> {
	TextValue: Value<string>; // Text displayed on the badge
	Corner: "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight"; // Position of the badge corner
	OnClick?: () => void; // Optional click handler
}

export const Badge = (props: BadgeProps) => {
	const Position = Computed(() => {
		switch (props.Corner) {
			case "TopLeft":
				return UDim2.fromScale(0, 0);
			case "TopRight":
				return UDim2.fromScale(1, 0);
			case "BottomLeft":
				return UDim2.fromScale(0, 1);
			case "BottomRight":
				return UDim2.fromScale(1, 1);
		}
	});

	// Create the badge button with an icon and text

	const button = New("TextButton")({
		Name: props.Name ?? "Badge",
		AnchorPoint: new Vector2(0.5, 0.5), // Center the badge
		Position: Position,
		Size: props.Size ?? UDim2.fromOffset(34, 34),
		BackgroundTransparency: 0,
		BackgroundColor3: props.BackgroundColor3 ?? new Color3(1, 0, 0), // Default red background
		Text: Computed(() => props.TextValue.get()),
		ZIndex: props.ZIndex ?? 10000,
		LayoutOrder: props.LayoutOrder ?? 0,
		TextColor3: props.TextColor3 ?? new Color3(1, 1, 1), // Default white text
		TextStrokeColor3: props.TextStrokeColor3 ?? new Color3(0, 0, 0), // Default black stroke
		TextStrokeTransparency: props.TextStrokeTransparency ?? 0.5, // Default stroke transparency
		TextSize: props.TextSize ?? 14,
		[Children]: {
			Corner: New("UICorner")({
				CornerRadius: new UDim(0, 8), // Rounded corners
			}),
		},
		[OnEvent("Activated")]: () => {
			if (props.OnClick) {
				props.OnClick();
			}
		},
	});

	return button;
};
