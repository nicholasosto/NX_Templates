/**
 * @file        src/server/services/index.ts
 * @module      Services
 * @layer       Server
 * @description Barrel export for all server services managing shared definitions.
 */

// Core Game Services
export { NPCService } from "./NPCService";
export { LootService } from "./LootService";
export { ResourceService } from "./ResourceService";
export { MessageService } from "./MessageService";
export { PlayerDataService } from "./PlayerDataService";

// System Services
export { CombatService } from "./CombatService";
export { WorldService } from "./WorldService";
export { EventService } from "./EventService";

// Utility Services
export { ValidationService } from "./ValidationService";
export { ConfigService } from "./ConfigService";
