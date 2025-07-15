/// <reference types="@rbxts/types" />

/**
 * @file        BaseContainer.ts
 * @module      BaseContainer
 * @layer       Client/UI/Atoms
 * @description Simple frame wrapper used by container variants.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion, { Children, New, PropertyTable } from "@rbxts/fusion";
import { useToken } from "theme/hooks";

export interface BaseContainerProps extends PropertyTable<Frame> {
	Padding?: UIPadding;
	BorderImage?: ImageLabel;
	Content?: Fusion.ChildrenValue;
}

export const BaseContainer = (props: BaseContainerProps) => {
	const bg = useToken("panelBg");

	return New("Frame")({
		Name: props.Name ?? "BaseContainer",
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		Position: props.Position ?? UDim2.fromScale(0, 0),
		Size: props.Size ?? UDim2.fromScale(1, 1),
		BackgroundColor3: props.BackgroundColor3 ?? bg,
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		LayoutOrder: props.LayoutOrder ?? 0,
		ZIndex: props.ZIndex ?? 1,
		[Children]: {
			Padding: props.Padding,
			BorderImage: props.BorderImage,
			...(props.Content ?? {}),
		},
	});
};
