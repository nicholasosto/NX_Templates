/// <reference types="@rbxts/types" />

import { Value } from "@rbxts/fusion";
import { BorderImage } from "client/ui/atoms/BorderImage";
import { createAudio } from "shared/assets/audio";
import { FillbarColors, PanelBackgroundColors, TextColors } from "./color";

/**
 * @file        theme.ts
 * @module      Theme
 * @layer       Client/Style
 * @description Shared color palette and theme tokens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/* =============================================== Color Tokens ================================ */

export const StrokeColors = {
	ZombieTheme: {
		StrokeDefault: new Color3(0.11, 0, 0),
		StrokeHover: new Color3(0.24, 0.13, 0.01),
	},
	RobotTheme: {
		StrokeDefault: new Color3(0.11, 0, 0),
		StrokeHover: new Color3(0.24, 0.13, 0.01),
	},
};

export const TextToken = () => {
	return {
		Font: PlayerTheme.TextTheme.Font,
		TextColor: PlayerTheme.TextTheme.TextColor,
		TextHoverColor: PlayerTheme.TextTheme.TextHoverColor,
		TextDisabledColor: PlayerTheme.TextTheme.TextDisabledColor,
	};
};

/* ================================================ Text Tokens ================================ */
export const TextTokens = {
	ZombieTheme: {
		Font: Font.fromName("Oswald", Enum.FontWeight.Regular, Enum.FontStyle.Normal),
		FontHover: Font.fromName("LuckiestGuy", Enum.FontWeight.Bold, Enum.FontStyle.Italic),
		TextHoverColor: TextColors.ZombieTheme.TextHover,
		TextDisabledColor: TextColors.ZombieTheme.TextDisabled,
		TextDefaultColor: new Color3(0.65, 0.99, 0.09),
		TextStrokeColor: new Color3(0.11, 0, 0),
		TextHover: new Color3(1, 1, 1),
		TextDisabled: new Color3(0.5, 0.5, 0.5),
	},
	RobotTheme: {
		Font: Font.fromName("Oswald", Enum.FontWeight.Regular, Enum.FontStyle.Normal),
		FontHover: Font.fromName("LuckiestGuy", Enum.FontWeight.Bold, Enum.FontStyle.Italic),
		TextHoverColor: TextColors.ZombieTheme.TextHover,
		TextDisabledColor: TextColors.ZombieTheme.TextDisabled,
		TextDefaultColor: new Color3(0.65, 0.99, 0.09),
		TextStrokeColor: new Color3(0.11, 0, 0),
		TextHover: new Color3(1, 1, 1),
		TextDisabled: new Color3(0.5, 0.5, 0.5),
	},
};

/* =============================================== Theme State ============================= */
export const THEME_KEYS = ["RobotTheme", "ZombieTheme"] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

export interface ThemeProps {
	TextTheme: {
		Font: Value<Font>;
		TextColor: Value<Color3>;
		TextHoverColor: Value<Color3>;
		TextDisabledColor: Value<Color3>;
	};

	PanelTheme: {
		BackgroundColor: Value<Color3>;
		BackgroundHoverColor: Value<Color3>;
		StrokeColor: Value<Color3>;
	};

	ResourceBars: {
		BorderImage: Value<ImageLabel>;
		HealthBarColor: Value<Color3>;
		StaminaBarColor: Value<Color3>;
		ManaBarColor: Value<Color3>;
	};

	Audio: {
		BackgroundMusic: Value<Sound>;
		SuccessClick: Value<Sound>;
		ErrorClick: Value<Sound>;
		Damaged: Value<Sound>;
	};
}

export const createTheme = (theme: ThemeKey): ThemeProps => {
	const isZombie = theme === "ZombieTheme";

	return {
		TextTheme: {
			Font: Value(isZombie ? TextTokens.ZombieTheme.Font : TextTokens.RobotTheme.Font),
			TextColor: Value(
				isZombie ? TextTokens.ZombieTheme.TextDefaultColor : TextTokens.RobotTheme.TextDefaultColor,
			),
			TextHoverColor: Value(isZombie ? TextTokens.ZombieTheme.TextHover : TextTokens.RobotTheme.TextHover),
			TextDisabledColor: Value(
				isZombie ? TextTokens.ZombieTheme.TextDisabled : TextTokens.RobotTheme.TextDisabled,
			),
		},

		PanelTheme: {
			BackgroundColor: Value(
				isZombie
					? PanelBackgroundColors.ZombieTheme.BackgroundColor
					: PanelBackgroundColors.RobotTheme.BackgroundColor,
			),
			BackgroundHoverColor: Value(
				isZombie
					? PanelBackgroundColors.ZombieTheme.BackgroundHoverColor
					: PanelBackgroundColors.RobotTheme.BackgroundHoverColor,
			),
			StrokeColor: Value(
				isZombie ? StrokeColors.ZombieTheme.StrokeDefault : StrokeColors.RobotTheme.StrokeDefault,
			),
		},

		ResourceBars: {
			BorderImage: Value(isZombie ? BorderImage.GothicMetal() : BorderImage.RedThick()),
			HealthBarColor: Value(isZombie ? FillbarColors.ZombieTheme.Health : FillbarColors.RobotTheme.Health),
			ManaBarColor: Value(isZombie ? FillbarColors.ZombieTheme.Mana : FillbarColors.RobotTheme.Mana),
			StaminaBarColor: Value(isZombie ? FillbarColors.ZombieTheme.Stamina : FillbarColors.RobotTheme.Stamina),
		},

		Audio: {
			BackgroundMusic: Value(createAudio(theme, "BackgroundMusic")),
			SuccessClick: Value(createAudio(theme, "SuccessClick")),
			ErrorClick: Value(createAudio(theme, "ErrorClick")),
			Damaged: Value(createAudio(theme, "Damaged")),
		},
	};
};

export const ZombieTheme = createTheme("ZombieTheme");
export const RobotTheme = createTheme("RobotTheme");

export const PlayerTheme = ZombieTheme;
