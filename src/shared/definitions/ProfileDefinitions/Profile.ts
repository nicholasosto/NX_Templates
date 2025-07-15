/// <reference types="@rbxts/types" />

/**
 * @file        Profile.ts
 * @module      ProfileDefinitions
 * @layer       Shared/Definitions/Profile
 * @description Types for the top-level ProfileService structure.
 */

import { AbilityKey, CurrencyKey, PlayerSettings } from "..";
import { AttributesDTO } from "./Attributes";
import { ProgressionDTO } from "./Progression";

// shared/ProfileDataTypes.ts
export const ProfileDataKeys = ["Abilities", "Attributes", "Settings", "Progression", "Currency"] as const;
export type ProfileDataKey = (typeof ProfileDataKeys)[number];

/** Shape of each bucket inside the player’s ProfileService blob */
export interface ProfileDataMap {
	Abilities: AbilityKey[];
	Attributes: AttributesDTO;
	Progression: ProgressionDTO;
	Settings: PlayerSettings;
	Currency: Record<CurrencyKey, number>; // Dynamic currency map
}
