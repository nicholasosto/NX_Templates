/// <reference types="@rbxts/types" />

/**
 * @file        AttributesSlice.ts
 * @module      AttributesSlice
 * @layer       Client/State
 * @description Reactive container for player attribute values.
 */

/**
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import { Value } from "@rbxts/fusion";
// import { ClientSend } from "client/network";
import { ATTR_KEYS, AttributeKey, AttributesDTO, DefaultAttributes } from "shared";

export default class AttributesSlice {
	public readonly Attributes: Record<AttributeKey, Value<number>> = {} as Record<AttributeKey, Value<number>>;
	public readonly Available = Value(0);
	public readonly Spent = Value(0);

	constructor() {
		ATTR_KEYS.forEach((key) => {
			this.Attributes[key] = Value(DefaultAttributes[key]);
		});
		this.Available.set(DefaultAttributes.AvailablePoints);
		this.Spent.set(DefaultAttributes.SpentPoints);
	}

	public UpdateAttributes(attributes: AttributesDTO) {
		for (const key of ATTR_KEYS) {
			const attr = this.Attributes[key];
			if (attr && attributes[key] !== undefined) {
				attr.set(attributes[key]);
			} else {
				warn(`Attribute ${key} not found in AttributesSlice or provided attributes.`);
			}
		}
		this.Available.set(attributes.AvailablePoints);
		this.Spent.set(attributes.SpentPoints);
	}

	public ModifyAttribute(key: AttributeKey, amount: number): boolean {
		// ClientSend.ModifyAttribute(key, amount)
		// 	.then((attrs) => {
		// 		if (attrs === undefined) {
		// 			warn(`ModifyAttribute failed for key ${key} with amount ${amount}.`);
		// 			return false;
		// 		}
		// 		this.UpdateAttributes(attrs);
		// 		return true;
		// 	})
		// 	.catch((err) => {
		// 		warn(`Failed to modify attribute ${key} by ${amount}:`, err);
		// 		return false;
		// 	});

		return true;
	}
}
