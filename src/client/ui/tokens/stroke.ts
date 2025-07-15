/// <reference types="@rbxts/types" />

/**
 * @file        stroke.ts
 * @module      Stroke
 * @layer       Style
 * @description Provides UI stroke utilities for creating borders and outlines on UI elements.
 *
 * ╭───────────────────────────────────╮
 * │  Soul Steel · Coding Guide        │
 * │  Fusion v4 · Strict TS · ECS      │
 * ╰───────────────────────────────────╯
 *
 * @author      Copilot
 * @license     MIT
 * @since       0.1.0
 * @lastUpdated 2025-06-23 by Copilot – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 *
 * @remarks
 *   Uses Fusion to create UIStroke instances.
 */

import Fusion, { New } from "@rbxts/fusion";

export interface StrokeProps {
	Thickness?: Fusion.Computed<number>;
	Color?: Fusion.Computed<Color3>;
	Transparency?: Fusion.Computed<number>;
}

export const Stroke = (props?: StrokeProps) => {
	return New("UIStroke")({
		Name: "Stroke",
		Thickness: props?.Thickness ?? 1,
		Color: props?.Color ?? new Color3(0, 0, 0),
		Transparency: props?.Transparency ?? 0.5,
		ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
	});
};
