// Server-side code
import { Players } from "@rbxts/services";

Players.PlayerAdded.Connect((player) => {
	print(`${player.Name} joined the game!`);
});

print("Server started!");
