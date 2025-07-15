/// <reference types="@rbxts/types" />

/**
 * @file        audio.ts
 * @module      GameAudio
 * @layer       shared/assets
 * @description List of audio asset IDs used in the game.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 */

export const GameAudio = {
	RobotTheme: {
		BackgroundMusic: "rbxassetid://1234567890", // Replace with actual asset ID
		SuccessClick: "rbxassetid://1234567891",
		ErrorClick: "rbxassetid://1234567892",
		Damaged: "rbxassetid://1234567893",
		CastSpell: "rbxassetid://1234567894",
		MeleeAttack: "rbxassetid://1234567895",
		Death: "rbxassetid://1234567896",
		LevelUp: "rbxassetid://1234567897",
	},
	ZombieTheme: {
		BackgroundMusic: "rbxassetid://1234567898", // Replace with actual asset ID
		SuccessClick: "rbxassetid://1234567899",
		ErrorClick: "rbxassetid://1234567900",
		Damaged: "rbxassetid://1234567901",
		CastSpell: "rbxassetid://1234567902",
		MeleeAttack: "rbxassetid://1234567903",
		Death: "rbxassetid://1234567904",
		LevelUp: "rbxassetid://1234567905",
	},
} as const;

export const createAudio = (theme: "RobotTheme" | "ZombieTheme", soundName: keyof (typeof GameAudio)["RobotTheme"]) => {
	const soundId = GameAudio[theme][soundName];
	const sound = new Instance("Sound");
	sound.SoundId = soundId;
	sound.Volume = 0.5; // Default volume, can be adjusted
	sound.Looped = false; // Set to true if you want the sound to loop
	return sound;
};
