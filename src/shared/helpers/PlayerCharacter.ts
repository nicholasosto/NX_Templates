/**
 * @file TouchFunctions.ts
 * @module TouchFunctions
 * @layer Shared/Touch
 * @description Contains utility functions for handling touch events in the game.
 * * ╭──────────────────────────────╮
 * * │  Soul Steel · Coding Guide   │
 * * │  Fusion v4 · Strict TS · ECS │
 * * ╰──────────────────────────────╯
 * * @author       Trembus
 * * @license      MIT
 * * @since        0.1.0
 * * @lastUpdated  2025-07-10 by Trembus – Added metadata header
 */



/**
 * Get the Humanoid object from a touched part.
 * @param touchedPart The part that was touched.
 * @param debug Whether to enable debug logging.
 * @returns The Humanoid object if found, otherwise undefined.
 */

function getAnimatorFromModel(model: Model): Animator | undefined {
	const animator = model.FindFirstChildOfClass("Animator");
	if (animator === undefined) {
		warn(`GetAnimatorFromModel: No Animator found in model ${model.Name}`);
		return undefined;
	}
	return animator as Animator;
}

function getCharacterFromPart(characterPart: BasePart): Model | undefined {
	return characterPart.FindFirstAncestorOfClass("Model") as Model | undefined;
}

function getHumanoidFromPart(touchedPart: BasePart): Humanoid | undefined {
	const character = getCharacterFromPart(touchedPart);
	if (character === undefined) return undefined;

	const touchedHumanoid = character.FindFirstChildOfClass("Humanoid");
	if (touchedHumanoid === undefined) return undefined;

	return touchedHumanoid as Humanoid;
}

function modifyHumanoidHealth(touchedPart: BasePart, amount: number): void {
	const humanoid = getHumanoidFromPart(touchedPart);
	if (humanoid) {
		print(`modifyHumanoidHealth: Modifying health by ${amount}`);
		humanoid.Health = math.clamp(humanoid.Health + amount, 0, humanoid.MaxHealth);
	} else {
		warn("modifyHumanoidHealth: Humanoid not found.");
	}
}

function modifyHumanoidSpeed(touchedPart: BasePart, speed: number): void {
	const humanoid = getHumanoidFromPart(touchedPart);
	if (humanoid) {
		print(`modifyHumanoidSpeed: Modifying speed to ${speed}`);
		humanoid.WalkSpeed = speed;
	} else {
		warn("modifyHumanoidSpeed: Humanoid not found.");
	}
}

export const PlayerHelpers = {
	getHumanoidFromPart: getHumanoidFromPart,
	getCharacterFromPart: getCharacterFromPart,
	getAnimatorFromModel: getAnimatorFromModel,
	modifySpeed: modifyHumanoidSpeed,
	modifyHealth: modifyHumanoidHealth,
};
