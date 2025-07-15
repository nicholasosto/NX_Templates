/// <reference types="@rbxts/types" />

/**
 * @file        Settings.ts
 * @module      SettingsDefinitions
 * @layer       Constants
 * @description Canonical list of player settings and metadata.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.2.1
 * @lastUpdated  2025-07-03 by Codex – Initial creation
 */

export const SETTING_KEYS = ["musicEnabled", "showFps", "nickname"] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];

export type SettingType = "boolean" | "string";

export interface SettingMeta {
	displayName: string;
	description: string;
	controlType: SettingType;
}

export const SettingsMeta = {
	musicEnabled: {
		displayName: "Music",
		description: "Toggle background music on or off.",
		controlType: "boolean",
	},
	showFps: {
		displayName: "Show FPS",
		description: "Display the current frames per second.",
		controlType: "boolean",
	},
	nickname: {
		displayName: "Nickname",
		description: "Set a custom player nickname.",
		controlType: "string",
	},
} as const satisfies Record<SettingKey, SettingMeta>;

export type PlayerSettings = Record<SettingKey, boolean | string>;

export const DefaultSettings = {
	musicEnabled: true,
	showFps: false,
	nickname: "",
} as const satisfies PlayerSettings;
