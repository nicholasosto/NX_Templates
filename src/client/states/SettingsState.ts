/// <reference types="@rbxts/types" />

/**
 * @file        SettingsState.ts
 * @module      SettingsState
 * @layer       Client
 * @description Reactive container for player settings.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/**
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import { Value } from "@rbxts/fusion";
import {
	DefaultSettings,
	PlayerSettings,
	SETTING_KEYS,
	SettingKey,
} from "shared/definitions/ProfileDefinitions/Settings";

export default class SettingsSlice {
	public Settings: Record<SettingKey, Value<boolean | string>> = {} as never;

	constructor() {
		for (const key of SETTING_KEYS) {
			this.Settings[key] = Value(DefaultSettings[key]);
		}
	}

	public UpdateSettings(settings: PlayerSettings) {
		for (const key of SETTING_KEYS) {
			const setting = this.Settings[key];
			if (setting && settings[key] !== undefined) {
				setting.set(settings[key]);
			} else {
				warn(`Setting ${key} not found in SettingsState or provided settings.`);
			}
		}
	}
}
