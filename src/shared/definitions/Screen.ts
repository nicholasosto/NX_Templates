/**
 * Ordered list of all HUD-related screen keys.
 */
export const SCREEN_KEYS = [
	"Settings",
	"Inventory",
	"Character",
	"Quests",
	"Shop",
	"Teleport",
	"GemForge",
	"Developer",
] as const;

export type ScreenKey = (typeof SCREEN_KEYS)[number];
