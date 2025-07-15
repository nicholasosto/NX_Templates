/// <reference types="@rbxts/types" />

/**
 * @file        hooks.ts
 * @module      ThemeHooks
 * @layer       Client
 * @description Helper hooks for consuming theme tokens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion from "@rbxts/fusion";
import { ThemeState } from "../client/states/ThemeState";
import { ColourTokens, FontTokens, ImageTokens } from "./types";

const { Computed } = Fusion;

export function useToken<K extends keyof ColourTokens>(key: K): Fusion.Computed<Color3> {
	return Computed(() => ThemeState.tokens.get().colours[key]);
}

export function useFont(): Fusion.Computed<FontTokens> {
	return Computed(() => ThemeState.tokens.get().fonts);
}

export function useImage<K extends keyof ImageTokens>(key: K): Fusion.Computed<string> {
	return Computed(() => ThemeState.tokens.get().images[key]);
}
