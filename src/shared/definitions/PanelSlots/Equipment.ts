/// <reference types="@rbxts/types" />

/**
 * @file        Equipment.ts
 * @module      EquipmentDefinitions
 * @layer       Shared/Data
 * @description Enumerates equipment slots and their metadata.
 */

import { GameImages } from "shared/assets";

export const EQUIPMENT_SLOT_KEYS = ["Helmet", "Chest", "Back", "Necklace", "Ring"] as const;
// Equipment Slot Keys
export type EquipmentSlotKey = (typeof EQUIPMENT_SLOT_KEYS)[number];

// Equipment Slot Map Type
export type EquipmentSlotMap = Record<EquipmentSlotKey, string>;

// Equipment Slot Metadata Interface
export interface EquipmentSlotMeta {
	displayName: string;
	iconId: string;
}

// Equipment Slot Metadata Records
export const EquipmentSlotMeta = {
	Helmet: { displayName: "Helmet", iconId: GameImages.SlotImage.Helmet },
	Chest: { displayName: "Chest", iconId: GameImages.SlotImage.Armor },
	Back: { displayName: "Back", iconId: GameImages.SlotImage.Accessory },
	Necklace: { displayName: "Necklace", iconId: GameImages.SlotImage.Accessory },
	Ring: { displayName: "Ring", iconId: GameImages.SlotImage.Accessory },
} as const satisfies Record<EquipmentSlotKey, EquipmentSlotMeta>;
