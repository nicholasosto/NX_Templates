import Fusion from "@rbxts/fusion";

import { Children, Computed, New, OnEvent, PropertyTable, Value } from "@rbxts/fusion";

export interface DraggerProps extends Partial<PropertyTable<UIDragDetector>> {
	DragStart?: () => void;
	DragEnd?: () => void;
	DragContinue?: () => void;
	EnabledState?: Value<boolean>;
}

export const Dragger = (props?: DraggerProps) => {
	const dragger = New("UIDragDetector")({
		Name: "Dragger",
		Enabled: Computed(() => props?.EnabledState?.get() ?? true),

		[OnEvent("DragStart")]: () => {
			print("Drag started");
		},
		[OnEvent("DragEnd")]: () => {
			print("Drag ended");
		},
		[OnEvent("DragContinue")]: () => {
			print("Dragging...");
		},
	});

	return dragger;
};
