/// <reference types="@rbxts/types" />

/**
 * @file        GameImage.ts
 * @module      GameImage
 * @layer       Client/UI/Atoms
 * @description Lightweight wrapper around `ImageLabel`.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-05-29 by Luminesa – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

/* =============================================== Imports ========================================= */
import Fusion, { Children, New } from "@rbxts/fusion";

/* =============================================== Props ========================================= */
export interface GameImageProps extends Fusion.PropertyTable<ImageLabel> {
	Test?: boolean; // For testing purposes
	RatioConstraint?: number;
}

/* =============================================== GameImage Component ========================================= */
export function GameImage(props: GameImageProps): ImageLabel {
	return New("ImageLabel")({
		Name: props.Name ?? "GameImage",
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		BackgroundTransparency: 1,
		Image: props.Image ?? "rbxassetid://121566852339881",
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Position: props.Position ?? UDim2.fromScale(0.5, 0.5),
		ZIndex: props.ZIndex ?? 1,
		ScaleType: props.ScaleType ?? Enum.ScaleType.Fit,
		SliceCenter: props.SliceCenter ?? new Rect(0, 0, 0, 0),
		ImageRectOffset: props.ImageRectOffset ?? new Vector2(0, 0),
		ImageRectSize: props.ImageRectSize ?? new Vector2(0, 0),
		LayoutOrder: props.LayoutOrder ?? 0,
		[Children]: {
			RatioConstraint: props.RatioConstraint
				? New("UIAspectRatioConstraint")({
						AspectRatio: props.RatioConstraint,
						DominantAxis: Enum.DominantAxis.Height,
					})
				: undefined,
		},
	});
}
