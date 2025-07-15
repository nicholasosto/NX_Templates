/// <reference types="@rbxts/types" />

/**
 * @file        animations.ts
 * @module      AnimationAssets
 * @layer       Shared/Assets
 * @description Helpers for loading and playing animation tracks.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

export const ANIMATION_KEY = [
	"WhipAttack",
	"Dodge",
	"GodLike",
	"HallowHold",
	"KickFast",
	"PowerBeam",
	"Punch_01",
	"ScytheAttack",
	"SpinKick",
	"TakeDamage",
	"Taunt",
] as const;
export type AnimationKey = (typeof ANIMATION_KEY)[number];
export type TrackMap = Record<AnimationKey, AnimationTrack>;

const AnimationTrackRegistry = new Map<Model, TrackMap>();

export const RegisterTrackMap = (model: Model, trackMap: TrackMap): void => {
	if (AnimationTrackRegistry.has(model)) {
		warn(`TrackMap for model ${model.Name} already exists. Overwriting.`);
	}
	AnimationTrackRegistry.set(model, trackMap);
};
export const DeregisterTrackMap = (model: Model): void => {
	if (AnimationTrackRegistry.has(model)) {
		AnimationTrackRegistry.delete(model);
	}
};

export const GetTrack = (model: Model, key: AnimationKey): AnimationTrack | undefined => {
	if (AnimationTrackRegistry.has(model)) {
		return AnimationTrackRegistry.get(model)?.[key];
	}
};

export const AnimationAssets: Record<AnimationKey, string> = {
	WhipAttack: "rbxassetid://125608150014654", // Replace with actual asset
	Dodge: "rbxassetid://15487656295", // Replace with actual asset
	GodLike: "rbxassetid://140479956568725", // Replace with actual asset
	HallowHold: "rbxassetid://125099220628366", // Replace with actual asset
	KickFast: "rbxassetid://126544239907410", // Replace with actual asset
	PowerBeam: "rbxassetid://132928610589952", // Replace with actual asset
	Punch_01: "rbxassetid://15487656295", // Replace with actual asset
	ScytheAttack: "rbxassetid://77799116860007", // Replace with actual asset
	SpinKick: "rbxassetid://100351397638487", // Replace with actual asset
	TakeDamage: "rbxassetid://16144885391", // Replace with actual
	Taunt: "rbxassetid://98363948502311", // Replace with actual asset
};

export function getAnimationAsset(key: AnimationKey): string {
	if (key in AnimationAssets) {
		return AnimationAssets[key];
	} else {
		warn(`Animation asset for key "${key}" not found.`);
		return "";
	}
}

export function createAnimation(key: AnimationKey): Animation {
	const animation = new Instance("Animation");
	animation.AnimationId = getAnimationAsset(key);
	animation.Name = key;
	return animation;
}

export function loadAnimation(model: Model, key: AnimationKey): AnimationTrack | undefined {
	const animation = createAnimation(key);
	const humanoid = model.FindFirstChildOfClass("Humanoid") as Humanoid | undefined;
	if (humanoid) {
		const animator = humanoid.FindFirstChildOfClass("Animator") as Animator | undefined;
		if (animator) {
			const track = animator.LoadAnimation(animation);
			if (track) {
				if (!AnimationTrackRegistry.has(model)) {
					AnimationTrackRegistry.set(model, {} as TrackMap);
				}
				AnimationTrackRegistry.get(model)![key] = track;
				return track;
			} else {
				warn(`Failed to load animation track for ${key} on model ${model.Name}`);
			}
		} else {
			warn(`Animator not found on model ${model.Name}`);
		}
	} else {
		warn(`Humanoid not found on model ${model.Name}`);
	}
	return undefined;
}

export const playAnimation = (model: Model, key: AnimationKey): void => {
	const track = GetTrack(model, key);
	if (track) {
		track.Play();
	} else {
		warn(`Animation track for ${key} not found on model ${model.Name}`);
	}
};
