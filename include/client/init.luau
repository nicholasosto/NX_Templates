-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- Client-side code
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "node_modules", "@rbxts", "services").Players
local player = Players.LocalPlayer
print(`Hello from client, {player.Name}!`)
return nil
