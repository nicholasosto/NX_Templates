/// <reference types="@rbxts/types" />

/**
 * @file        cyberGothic.ts
 * @module      CyberGothicTokens
 * @layer       Shared
 * @description Token table for the CyberGothic theme.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { ThemeTokens } from "../types";

/* =============================================== Token Table ============================= */

export const cyberGothic: ThemeTokens = {
	colours: {
		panelBg: Color3.fromRGB(16, 16, 16),
		panelBgHover: Color3.fromRGB(32, 32, 32),
		panelBorder: Color3.fromRGB(0, 255, 153),
		textPrimary: Color3.fromRGB(0, 255, 153),
		textSecondary: Color3.fromRGB(179, 255, 230),
		textDisabled: Color3.fromRGB(100, 100, 100),
		healthFill: Color3.fromRGB(255, 64, 128),
		manaFill: Color3.fromRGB(0, 200, 255),
		staminaFill: Color3.fromRGB(128, 255, 0),
	},
	fonts: {
		family: Enum.Font.Arcade,
		weightNormal: 400,
		weightBold: 700,
	},
	images: {
		panelBorderSlice: "rbxassetid://1234567890",
	},
};
