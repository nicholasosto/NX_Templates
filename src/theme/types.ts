/// <reference types="@rbxts/types" />

/**
 * @file        types.ts
 * @module      ThemeTypes
 * @layer       Shared
 * @description Type contracts for theme design tokens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/* =============================================== Token Groups ============================ */

export interface ColourTokens {
	panelBg: Color3;
	panelBgHover: Color3;
	panelBorder: Color3;
	textPrimary: Color3;
	textSecondary: Color3;
	textDisabled: Color3;
	healthFill: Color3;
	manaFill: Color3;
	staminaFill: Color3;
}

export interface FontTokens {
	family: Enum.Font;
	weightNormal: number;
	weightBold: number;
}

export interface ImageTokens {
	panelBorderSlice: string;
}

export type ThemeTokens = {
	colours: ColourTokens;
	fonts: FontTokens;
	images: ImageTokens;
};
