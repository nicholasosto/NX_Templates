// Shared utilities
export function greet(name: string): string {
	return `Hello, ${name}!`;
}

export const GAME_CONFIG = {
	VERSION: "1.0.0",
	MAX_PLAYERS: 10,
} as const;
