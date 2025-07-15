/// <reference types="@rbxts/types" />

/**
 * @file        src/client/states/index.ts
 * @module      states
 * @layer       Client/State
 * @description Barrel index file for the shared states module, exporting all state management utilities.
 */

export * from "./PlayerState";
export * from "./ScreenState";
export * from "./ThemeState";
export { default as SettingsState } from "./SettingsState";
export { default as AbilitySlice } from "./AbilitySlice";
export { default as ResourceSlice } from "./ResourceSlice";
export { default as AttributesSlice } from "./AttributesSlice";
export { default as ProgressionSlice } from "./ProgressionSlice";
export { default as CurrencySlice } from "./CurrencySlice";
export { default as MessageSlice } from "./MessageSlice";
export { default as GameState } from "./GameState";
