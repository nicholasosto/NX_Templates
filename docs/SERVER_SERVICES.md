# Server Services Documentation

This document provides an overview of the server-side services that manage the shared definitions and game systems.

## Overview

The server services are organized into three main categories:

### Core Game Services
These services handle the primary game mechanics and player interactions:

- **NPCService**: Manages NPC spawning, behavior, and lifecycle
- **LootService**: Handles loot generation, drops, and reward distribution
- **ResourceService**: Manages player resources (Health, Mana, Stamina)
- **MessageService**: Handles in-game messages, notifications, and announcements
- **PlayerDataService**: Manages player data persistence and profiles

### System Services
These services handle broader game systems and world management:

- **CombatService**: Manages combat mechanics and damage calculation
- **WorldService**: Handles world state, zones, and environmental systems
- **EventService**: Manages game events and event-driven systems

### Utility Services
These services provide supporting functionality:

- **ValidationService**: Validates game data and user inputs
- **ConfigService**: Manages game configuration and feature flags

## Service Architecture

All services follow the Singleton pattern and provide:
- Static `getInstance()` method for accessing the service
- Type-safe interfaces for data management
- Event-driven communication between services
- Proper cleanup when players leave

## Usage Examples

### Basic Service Usage

```typescript
import { NPCService, LootService, MessageService } from "server/services";

// Get service instances
const npcService = NPCService.getInstance();
const lootService = LootService.getInstance();
const messageService = MessageService.getInstance();

// Spawn an NPC
const npc = npcService.spawnNPC("ZOMBIE", new Vector3(10, 5, 10));

// Drop loot when NPC dies
if (npc) {
    lootService.dropLoot("ZOMBIE_COMMON", npc.position);
}

// Send notification to player
messageService.sendSystemNotification(player, "warning", "An enemy approaches!");
```

### Resource Management

```typescript
import { ResourceService } from "server/services";

const resourceService = ResourceService.getInstance();

// Check if player has enough mana for a spell
if (resourceService.hasEnoughResource(player, "Mana", 50)) {
    // Cast spell
    resourceService.consumeResource(player, "Mana", 50);
} else {
    // Not enough mana
    messageService.sendMessageToPlayer(player, "Not enough mana!", "", "error");
}
```

### Configuration Management

```typescript
import { ConfigService } from "server/services";

const configService = ConfigService.getInstance();

// Check if PvP is enabled
if (configService.isFeatureEnabled("pvpEnabled")) {
    // Handle PvP combat
}

// Get gameplay settings
const maxLevel = configService.get<number>("gameplay.maxLevel");
const respawnTime = configService.get<number>("gameplay.respawnTime");
```

## Integration with Shared Definitions

The services are designed to work seamlessly with the shared definitions:

- **NPCService** uses `shared/definitions/NPC.ts` for NPC metadata and spawning
- **LootService** uses `shared/definitions/Loot.ts` for loot table generation
- **ResourceService** uses `shared/definitions/Resources.ts` for resource management
- **MessageService** uses `shared/definitions/Message.ts` for message formatting

## Event System

Services can communicate through the EventService:

```typescript
import { EventService } from "server/services";

const eventService = EventService.getInstance();

// Listen for events
eventService.on("playerLevelUp", (data: { player: Player; newLevel: number }) => {
    messageService.sendSystemNotification(data.player, "level_up", `You are now level ${data.newLevel}!`);
});

// Fire events
eventService.fire("npcDefeated", { npcId: "npc_1", playerId: player.UserId });
```

## Error Handling

All services include proper error handling and validation:

- Input validation through ValidationService
- Graceful fallbacks for missing data
- Comprehensive logging for debugging
- Safe cleanup on player disconnect

## Future Enhancements

Potential areas for expansion:

1. **Quest System**: QuestService for managing player quests and objectives
2. **Guild System**: GuildService for player organizations
3. **Trading System**: TradeService for player-to-player trading
4. **Auction House**: AuctionService for item marketplace
5. **Analytics**: AnalyticsService for game metrics and player behavior
6. **Anti-Cheat**: SecurityService for detecting exploits and cheating

## Best Practices

When working with the server services:

1. Always use the singleton instances via `getInstance()`
2. Handle async operations properly (especially PlayerDataService)
3. Validate inputs using ValidationService before processing
4. Use the EventService for loose coupling between systems
5. Check feature flags via ConfigService before enabling features
6. Clean up resources when players leave the game
