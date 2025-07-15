/// <reference types="@rbxts/types" />

/**
 * @file        Currency.ts
 * @module      CurrencyDefinitions
 * @layer       Shared/Data
 * @description Canonical list of in-game currencies and their metadata.
 */

export const CURRENCY_KEYS = ["GOLD", "SILVER", "BRONZE"] as const;
export type CurrencyKey = (typeof CURRENCY_KEYS)[number];
export interface CurrencyMeta {
	displayName: string;
	iconId: string;
}

export const CurrencyMetaMap = {
	GOLD: { displayName: "Gold", iconId: "rbxassetid://1234567890" },
	SILVER: { displayName: "Silver", iconId: "rbxassetid://1234567891" },
	BRONZE: { displayName: "Bronze", iconId: "rbxassetid://1234567892" },
} as const satisfies Record<CurrencyKey, CurrencyMeta>;

export type CurrencyMap = Record<CurrencyKey, number>;

export const DefaultCurrency = CURRENCY_KEYS.reduce<CurrencyMap>((obj, key) => {
	obj[key] = 0;
	return obj;
}, {} as CurrencyMap);
