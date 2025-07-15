/// <reference types="@rbxts/types" />

/**
 * @file        UIButton.ts
 * @module      UIButton
 * @layer       Client/UI/Atoms
 * @description Unified button primitive used by all button wrappers.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

// -------------- Imports ------------- //
import { Children, Computed, New, OnEvent, PropertyTable, Value } from "@rbxts/fusion";
import { BaseContainer } from "./BaseContainer";
import { GameText } from "./GameText";
import { BorderImage } from "./BorderImage";
import { GameImages } from "shared/assets";
import { RarityKey } from "shared/definitions/Rarity";
import { ButtonSizes } from "shared/constants/sizes";
import { useToken } from "theme/hooks";

// -------------- Helpers -------------- //
function resolveIcon(icon?: string): string {
	if (icon === undefined) return "";
	const lookup = (GameImages as unknown as Record<string, string>)[icon];
	return lookup ?? icon;
}

function resolveBorder(rarity?: RarityKey) {
	if (!rarity) return undefined;
	switch (rarity) {
		case "Common":
			return BorderImage.CommonRarity();
		case "Uncommon":
			return BorderImage.CommonRarity();
		case "Rare":
			return BorderImage.RareRarity();
		case "Epic":
			return BorderImage.EpicRarity();
		case "Legendary":
			return BorderImage.LegendaryRarity();
	}
}

// -------------- Props ---------------- //
export interface UIButtonProps extends PropertyTable<ImageButton> {
	/** Main icon – raw asset id or GameImages key */
	Icon?: string;
	/** Optional rarity key → resolves to BorderImage */
	Rarity?: RarityKey;
	/** Optional label under the icon */
	Label?: string;
	/** Show as panel-style (token background) or flat */
	Variant?: "flat" | "panel";
	/** Interactive flags */
	Draggable?: boolean;
	Selected?: boolean;

	LayoutOrder?: number;
	RatioValue?: number; // Aspect ratio for the button, if applicable

	/* Content */

	/* Event handlers */
	OnClick?: () => void;
	OnDragStart?: (pos: Vector2) => void;
	OnDragContinue?: (pos: Vector2) => void;
	OnDragEnd?: (pos: Vector2) => void;
}

// -------------- UIButton Component --------------- //
export const UIButton = (props: UIButtonProps) => {
	const variant = props.Variant ?? "flat";
	const selected = Value(props.Selected ?? false);
	const bg = useToken("panelBg");
	const borderColour = useToken("panelBorder");

	const background = Computed(() => (selected.get() ? borderColour.get() : bg.get()));

	const drag = props.Draggable
		? New("UIDragDetector")({
				Name: "DragDetector",
				Enabled: true,
				DragRelativity: Enum.UIDragDetectorDragRelativity.Absolute,
				DragStyle: Enum.UIDragDetectorDragStyle.Scriptable,
				[OnEvent("DragStart")]: props.OnDragStart,
				[OnEvent("DragContinue")]: props.OnDragContinue,
				[OnEvent("DragEnd")]: props.OnDragEnd,
			})
		: undefined;

	const button = New("ImageButton")({
		Name: props.Name ?? "UIButton",
		Size: props.Size ?? ButtonSizes.Icon(),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? UDim2.fromScale(0.5, 0.5),
		LayoutOrder: props.LayoutOrder,
		BackgroundTransparency: variant === "flat" ? 1 : (props.BackgroundTransparency ?? 0),
		BackgroundColor3: variant === "panel" ? background : (props.BackgroundColor3 ?? new Color3(1, 1, 1)),
		Image: resolveIcon(props.Icon),
		ImageColor3: props.ImageColor3 ?? new Color3(1, 1, 1),
		ZIndex: props.ZIndex ?? 1,
		[OnEvent("Activated")]: () => props.OnClick && props.OnClick(),
		[Children]: {
			AspectRatio: props.RatioValue
				? New("UIAspectRatioConstraint")({
						AspectRatio: props.RatioValue,
						DominantAxis: Enum.DominantAxis.Height,
					})
				: undefined,
			Label: props.Label
				? GameText({
						Name: "Label",
						TextState: Value(props.Label),
						AnchorPoint: new Vector2(0.5, 1),
						Position: UDim2.fromScale(0.5, 1),
						Size: UDim2.fromScale(1, 0.25),
						BackgroundTransparency: 1,
						TextSize: 14,
					})
				: undefined,
			Border: props.Rarity
				? (() => {
						const b = resolveBorder(props.Rarity!);
						if (b) {
							b.AnchorPoint = new Vector2(0.5, 0.5);
							b.Position = UDim2.fromScale(0.5, 0.5);
							b.Size = UDim2.fromScale(1, 1);
						}
						return b;
					})()
				: undefined,
			Drag: variant === "flat" ? drag : undefined,
			Content: props[Children] ?? undefined,
		},
	});

	if (variant === "panel") {
		return BaseContainer({
			Name: `${props.Name ?? "UIButton"}Panel`,
			Size: props.Size ?? ButtonSizes.Icon(),
			BackgroundTransparency: 0.2,
			Content: {
				Button: button,
				Drag: drag,
			},
		});
	}

	return button;
};
