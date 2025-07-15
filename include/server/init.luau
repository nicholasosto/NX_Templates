-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- Server-side code
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "node_modules", "@rbxts", "services").Players
Players.PlayerAdded:Connect(function(player)
	print(`{player.Name} joined the game!`)
end)
print("Server started!")
return nil
