-- Compiled with roblox-ts v3.0.0
-- Shared utilities
local function greet(name)
	return `Hello, {name}!`
end
local GAME_CONFIG = {
	VERSION = "1.0.0",
	MAX_PLAYERS = 10,
}
return {
	greet = greet,
	GAME_CONFIG = GAME_CONFIG,
}
