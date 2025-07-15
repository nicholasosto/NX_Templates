/// <reference types="@rbxts/types" />

/**
 * @file        src/ui/gradients.ts
 * @module      Gradient Exports
 * @layer       Client/Style
 * @description  Collection of reusable UI gradients for various styles.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-23 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { New } from "@rbxts/fusion";

const HealthGradient = () =>
	New("UIGradient")({
		Name: "UIGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(225, 0, 4)),
			new ColorSequenceKeypoint(0.953287, Color3.fromRGB(220, 0, 4)),
			new ColorSequenceKeypoint(1, new Color3()),
		]),
		Rotation: 6,
		Transparency: new NumberSequence([
			new NumberSequenceKeypoint(0, 0),
			new NumberSequenceKeypoint(0.746883, 0.00624996, 0.00624996),
			new NumberSequenceKeypoint(0.916459, 0.33125, 0.0275246),
			new NumberSequenceKeypoint(1, 0.9625, 0.0375),
		]),
	});

const ShadowGradient = () =>
	New("UIGradient")({
		Name: "ShadowGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, new Color3(0, 0, 0)),
			new ColorSequenceKeypoint(0.5, new Color3(0, 0, 0)),
			new ColorSequenceKeypoint(1, new Color3(0, 0, 0)),
		]),
		Transparency: new NumberSequence([
			new NumberSequenceKeypoint(0, 0.5),
			new NumberSequenceKeypoint(0.5, 0.5),
			new NumberSequenceKeypoint(1, 0.5),
		]),
		Rotation: 90,
		Offset: new Vector2(0, 0.5),
	});

const OldShadowGradient = () =>
	New("UIGradient")({
		Name: "ContainerGradientTransparent",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, new Color3()),
			new ColorSequenceKeypoint(0.0813149, Color3.fromRGB(21, 21, 21)),
			new ColorSequenceKeypoint(1, new Color3(1, 1, 1)),
		]),
		Transparency: new NumberSequence([
			new NumberSequenceKeypoint(0, 0),
			new NumberSequenceKeypoint(1, 0.625, 0.1875),
		]),
	});

/**
 * Warm sunrise style gradient.
 */
const SunriseGradient = () =>
	New("UIGradient")({
		Name: "SunriseGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(255, 170, 0)),
			new ColorSequenceKeypoint(0.5, Color3.fromRGB(255, 85, 0)),
			new ColorSequenceKeypoint(1, Color3.fromRGB(128, 0, 128)),
		]),
		Transparency: new NumberSequence(0),
		Rotation: 90,
	});

/**
 * Simple blue gradient useful for backgrounds.
 */
const OceanGradient = () =>
	New("UIGradient")({
		Name: "OceanGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(0, 170, 255)),
			new ColorSequenceKeypoint(1, Color3.fromRGB(0, 85, 170)),
		]),
		Transparency: new NumberSequence(0),
	});

/**
 * Glass-like glow with transparent center.
 */
const GlassGradient = () =>
	New("UIGradient")({
		Name: "GlassGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, new Color3(1, 1, 1)),
			new ColorSequenceKeypoint(0.5, new Color3(1, 1, 1)),
			new ColorSequenceKeypoint(1, new Color3(1, 1, 1)),
		]),
		Transparency: new NumberSequence([
			new NumberSequenceKeypoint(0, 0.8),
			new NumberSequenceKeypoint(0.5, 0.3),
			new NumberSequenceKeypoint(1, 0.8),
		]),
	});

/**
 * Lava-like gradient with fiery colors.
 *
 * @returns {UIGradient} The lava gradient.
 * @since 0.2.0
 * 	*/
const LavaGradient = () =>
	New("UIGradient")({
		Name: "LavaGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(255, 85, 0)),
			new ColorSequenceKeypoint(0.5, Color3.fromRGB(255, 122, 0)),
			new ColorSequenceKeypoint(1, Color3.fromRGB(255, 0, 0)),
		]),
		Transparency: new NumberSequence(0),
		Rotation: 90,
	});

/**
 * Purple-blue gradient used for the experience bar.
 */
const ExperienceGradient = () =>
	New("UIGradient")({
		Name: "ExperienceGradient",
		Color: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(94, 0, 255)),
			new ColorSequenceKeypoint(0.5, Color3.fromRGB(170, 0, 255)),
			new ColorSequenceKeypoint(1, Color3.fromRGB(255, 128, 255)),
		]),
		Transparency: new NumberSequence(0),
		Rotation: 90,
	});

export const Gradients = {
	HealthGradient,
	ShadowGradient,
	OldShadowGradient,
	SunriseGradient,
	OceanGradient,
	GlassGradient,
	LavaGradient,
	ExperienceGradient,
};
