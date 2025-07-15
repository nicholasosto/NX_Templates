/// <reference types="@rbxts/types" />

/**
 * @file        ResourceSlice.ts
 * @module      ResourceSlice
 * @layer       Client/State
 * @description Reactive container for player resources like health and mana.
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Trembus – Refactored
 */

import { Computed, Value } from "@rbxts/fusion";
import { ResourceKey, DEFAULT_RESOURCES, ResourceDTO } from "shared/definitions/Resources";

/* Types ----------------------------------------------------------- */
export type ResourceState = {
	current: Value<number>;
	max: Value<number>;
	percent: Computed<number>;
};

export type ResourceStateMap = {
	[Key in ResourceKey]: ResourceState;
};

/* Helpers ----------------------------------------------------------- */
/* Create Resource State */
function createResourceState(resourceDTO: ResourceDTO) {
	const data = resourceDTO;
	const currentValue = Value(data.current);
	const maxValue = Value(data.max);

	return {
		current: currentValue,
		max: maxValue,
		percent: Computed(() => {
			const current = currentValue.get();
			const max = maxValue.get();
			return max > 0 ? current / max : 0;
		}),
	};
}

/* ResourceSlice Class */
export default class ResourceSlice {
	public readonly Health: ResourceState;
	public readonly Mana: ResourceState;
	public readonly Stamina: ResourceState;

	constructor() {
		// Initialize resources with default values
		this.Health = createResourceState(DEFAULT_RESOURCES.Health);
		this.Mana = createResourceState(DEFAULT_RESOURCES.Mana);
		this.Stamina = createResourceState(DEFAULT_RESOURCES.Stamina);
	}

	public UpdateResource(key: ResourceKey, data: ResourceDTO): void {
		const resourceState = this[key];
		if (resourceState) {
			resourceState.current.set(data.current);
			resourceState.max.set(data.max);
		} else {
			warn(`Resource key ${key} does not exist in ResourceSlice.`);
		}
	}
}
