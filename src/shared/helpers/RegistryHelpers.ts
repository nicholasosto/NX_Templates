/**
 * @file src/shared/helpers/RegistryHelpers.ts
 * @module RegistryHelpers
 * @owner Trembus
 * @since 0.2.0
 * @lastUpdate 2025-07-12
 * @remarks
 * Provides utility functions for managing and validating registry data.
 */

import { HttpService } from "@rbxts/services";

export function generateUniqueId(curly: boolean = false): string {
	// Generates a unique ID based on the current time and a random number
	return HttpService.GenerateGUID(curly);
}
