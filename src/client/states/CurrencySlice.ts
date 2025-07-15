/// <reference types="@rbxts/types" />

/**
 * @file        CurrencySlice.ts
 * @module      CurrencySlice
 * @layer       Client/State
 * @description Reactive container for player currency amounts.
 * @author       Trembus
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Trembus – Refactored to be dynamic class instead of singleton
 */

import { Value } from "@rbxts/fusion";
import { CURRENCY_KEYS, CurrencyKey, DefaultCurrency } from "shared";

export default class CurrencySlice {
	public readonly Currency: Record<CurrencyKey, Value<number>> = {} as never;

	constructor() {
		for (const key of CURRENCY_KEYS) {
			this.Currency[key] = Value(DefaultCurrency[key]);
		}
	}

	public UpdateCurrency(currency: Record<CurrencyKey, number>) {
		for (const key of CURRENCY_KEYS) {
			this.Currency[key].set(currency[key] ?? DefaultCurrency[key]);
		}
	}
}
