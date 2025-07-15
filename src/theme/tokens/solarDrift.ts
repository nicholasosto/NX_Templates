/// <reference types="@rbxts/types" />

/**
 * @file        solarDrift.ts
 * @module      SolarDriftTokens
 * @layer       Shared
 * @description Example token table for the SolarDrift theme.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { ThemeTokens } from "../types";

/* =============================================== Token Table ============================= */

export const solarDrift: ThemeTokens = {
	colours: {
		panelBg: Color3.fromRGB(41, 13, 13),
		panelBgHover: Color3.fromRGB(61, 23, 23),
		panelBorder: Color3.fromRGB(255, 175, 0),
		textPrimary: Color3.fromRGB(252, 222, 158),
		textSecondary: Color3.fromRGB(99, 99, 99),
		textDisabled: Color3.fromRGB(70, 70, 70),
		healthFill: Color3.fromRGB(255, 80, 80),
		manaFill: Color3.fromRGB(80, 180, 255),
		staminaFill: Color3.fromRGB(255, 210, 80),
	},
	fonts: {
		family: Enum.Font.SciFi,
		weightNormal: 400,
		weightBold: 700,
	},
	images: {
		panelBorderSlice: "rbxassetid://9876543210",
	},
};
