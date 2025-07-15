/// <reference types="@rbxts/types" />

/**
 * @file        fateless.ts
 * @module      FatelessTokens
 * @layer       Shared
 * @description Token table for the imaginative Fateless theme.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { ThemeTokens } from "../types";

/* =============================================== Token Table ============================= */

export const fateless: ThemeTokens = {
	colours: {
		panelBg: Color3.fromRGB(5, 5, 15),
		panelBgHover: Color3.fromRGB(20, 20, 40),
		panelBorder: Color3.fromRGB(100, 0, 255),
		textPrimary: Color3.fromRGB(230, 230, 255),
		textSecondary: Color3.fromRGB(150, 150, 200),
		textDisabled: Color3.fromRGB(80, 80, 90),
		healthFill: Color3.fromRGB(255, 80, 105),
		manaFill: Color3.fromRGB(105, 80, 255),
		staminaFill: Color3.fromRGB(80, 255, 160),
	},
	fonts: {
		family: Enum.Font.Gotham,
		weightNormal: 400,
		weightBold: 700,
	},
	images: {
		panelBorderSlice: "rbxassetid://1122334455",
	},
};
