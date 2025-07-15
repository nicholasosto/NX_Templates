/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionSlice.ts
 * @module      ProgressionSlice
 * @layer       Client/State
 * @description Reactive container for level and experience values.
 */

/**
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import { Value, Computed } from "@rbxts/fusion";
import {
	PROGRESSION_KEYS,
	ProgressionKey,
	ProgressionDTO,
	DefaultProgression,
} from "shared/definitions/ProfileDefinitions/Progression";

export default class ProgressionSlice {
	public readonly Progression: Record<ProgressionKey, Value<number>> = {} as never;
	public readonly NextLevelExperience = Value(DefaultProgression.NextLevelExperience);
	public readonly ExperiencePercent!: Computed<number>;

	constructor() {
		for (const key of PROGRESSION_KEYS) {
			this.Progression[key] = Value(DefaultProgression[key]);
		}
		this.ExperiencePercent = Computed(
			() => this.Progression.Experience.get() / math.max(this.NextLevelExperience.get(), 1),
		);
	}

	public UpdateProgression(data: ProgressionDTO) {
		for (const key of PROGRESSION_KEYS) {
			if (data[key] !== undefined) {
				this.Progression[key].set(data[key]);
			} else {
				warn(`Progression key ${key} not found in provided data.`);
			}
		}
		this.NextLevelExperience.set(data.NextLevelExperience ?? DefaultProgression.NextLevelExperience);
	}
}
