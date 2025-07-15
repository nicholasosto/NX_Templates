/// <reference types="@rbxts/types" />

/**
 * @file        ListContainer.ts
 * @module      ListContainer
 * @layer       Client/UI/Atoms
 * @description Wrapper that stacks children vertically.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion, { Children, Computed } from "@rbxts/fusion";
import { useToken } from "theme/hooks";
import { Dragger } from "../tokens/dragger";

function CreateFlexMode(mode: string) {
	switch (mode) {
		case "Shrink":
			return Enum.UIFlexMode.Shrink;
		case "Grow":
			return Enum.UIFlexMode.Grow;
		case "None":
			return Enum.UIFlexMode.None;
		case "Fill":
			return Enum.UIFlexMode.Fill;
		default:
			return Enum.UIFlexMode.None;
	}
}

export interface ListContainerProps extends Partial<Fusion.PropertyTable<Frame>> {
	Gap?: number;
	LayoutOrientation: "vertical" | "horizontal";
	Content: Fusion.ChildrenValue;
	AlignmentType?: Enum.HorizontalAlignment | Enum.VerticalAlignment;
	Padding?: UIPadding;
	FlexMode?: "Shrink" | "Grow" | "None" | "Fill";
}

export const ListContainer = (props: ListContainerProps) => {
	const uiFlex = Fusion.New("UIFlexItem")({
		FlexMode: CreateFlexMode(props.FlexMode ?? "None"),
	});

	const bg = useToken("panelBg");
	const uiListLayout = Fusion.New("UIListLayout")({
		SortOrder: Enum.SortOrder.LayoutOrder,
		FillDirection:
			props.LayoutOrientation === "horizontal" ? Enum.FillDirection.Horizontal : Enum.FillDirection.Vertical,
		Padding: props.Gap !== undefined ? new UDim(0, props.Gap) : undefined,
		HorizontalAlignment: Enum.HorizontalAlignment.Center,
		VerticalAlignment: Enum.VerticalAlignment.Center,
	});

	const Component = Fusion.New("Frame")({
		Name: props.Name ?? "ListContainer",
		Size: props.Size ?? UDim2.fromScale(1, 1),
		Position: props.Position ?? UDim2.fromScale(0, 0),
		BackgroundColor3: props.BackgroundColor3 ?? bg,
		BackgroundTransparency: props.BackgroundTransparency ?? 1,
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		LayoutOrder: props.LayoutOrder ?? 0,
		[Children]: {
			Dragger: Dragger({
				DragStart: () => {
					uiListLayout.Destroy();
				},
			}),
			Flex: uiFlex,
			Layout: uiListLayout,
			Padding: props.Padding,
			...props.Content,
		},
	});

	return Component;
};
