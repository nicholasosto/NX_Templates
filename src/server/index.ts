/**
 * @file        src/server/index.ts
 * @module      ServerMain
 * @layer       Server
 * @description Main server entry point - initializes all services and game systems.
 */

import { Players } from "@rbxts/services";
import { 
	NPCService, 
	LootService, 
	ResourceService, 
	MessageService, 
	PlayerDataService,
	CombatService,
	WorldService,
	EventService,
	ValidationService,
	ConfigService 
} from "./services";

// Initialize all services
const npcService = NPCService.getInstance();
const lootService = LootService.getInstance();
const resourceService = ResourceService.getInstance();
const messageService = MessageService.getInstance();
const playerDataService = PlayerDataService.getInstance();
const combatService = CombatService.getInstance();
const worldService = WorldService.getInstance();
const eventService = EventService.getInstance();
const validationService = ValidationService.getInstance();
const configService = ConfigService.getInstance();

// Setup player events and game logic
Players.PlayerAdded.Connect((player) => {
	print(`${player.Name} joined the game!`);
	
	// Send welcome message
	messageService.sendSystemNotification(player, "welcome");
	
	// Example: Spawn an NPC near the player after 5 seconds
	task.wait(5);
	const spawnPosition = new Vector3(10, 5, 10);
	const spawnedNPC = npcService.spawnNPC("ZOMBIE", spawnPosition);
	
	if (spawnedNPC) {
		messageService.sendMessageToPlayer(
			player, 
			`A ${spawnedNPC.npcKey} has spawned nearby!`, 
			"Enemy Spotted", 
			"warning"
		);
	}
});

// Example event listeners
eventService.on("playerLevelUp", (data: { player: Player; newLevel: number }) => {
	messageService.sendSystemNotification(data.player, "level_up", `You are now level ${data.newLevel}!`);
});

eventService.on("npcDefeated", (data: { npcId: string; playerId: number }) => {
	// Drop loot when NPC is defeated
	const npc = npcService.getSpawnedNPC(data.npcId);
	if (npc) {
		lootService.dropLoot("ZOMBIE_COMMON", npc.position);
	}
});

print("Server started! All services initialized.");
print(`Debug mode: ${configService.isFeatureEnabled("debugMode")}`);
print(`Max level: ${configService.get<number>("gameplay.maxLevel")}`);
print(`PvP enabled: ${configService.isFeatureEnabled("pvpEnabled")}`);
