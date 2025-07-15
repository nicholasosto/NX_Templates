/**
 * @file        NPCDefinitions.ts
 * @module      DataDefinitions/NPC
 * @layer       Shared
 * @description Static NPC template catalogue.
 */

import { AbilityKey } from "./ProfileDefinitions/Ability";
import { LootTableKey } from "./Loot";
import { ReplicatedStorage } from "@rbxts/services";

/* --------------------------------------------------------- Rig Template Folders --------------------------------------------------------- */
const RigTemplateFolder = ReplicatedStorage.WaitForChild("SS Game Package").WaitForChild("Models").WaitForChild("Rigs");
const BloodTemplates = RigTemplateFolder.WaitForChild("Blood");
const DecayTemplates = RigTemplateFolder.WaitForChild("Decay");
const FatelessTemplates = RigTemplateFolder.WaitForChild("Fateless");
const RobotTemplates = RigTemplateFolder.WaitForChild("Robots");
const SpiritTemplates = RigTemplateFolder.WaitForChild("Spirit");

/* --------------------------------------------------------- NPC Keys --------------------------------------------------------- */
export const NPC_KEYS = ["BLOOD_TOAD", "ZOMBIE", "FATELESS", "MECHA_MONKEY", "STEAM_BOT", "ELEMENTAL"] as const;
export type NPCKey = (typeof NPC_KEYS)[number];

/** Compile-time template metadata */
export interface NPCMeta {
	/** Display name for UI & lore */
	displayName: string;
	/** rbxassetid of the base model stored in ReplicatedStorage */
	modelTemplate: Model;
	/** Core stats used by combat systems */
	baseStats: {
		maxHealth: number;
		attack: number;
		defense: number;
		speed: number;
	};
	/** Abilities (by key) that the AI can invoke */
	abilities: AbilityKey[];
	/** Loot-table key rolled on death */
	lootTable: LootTableKey;

	/** Optional behaviour flags or AI profiles */
	aiProfile?: "melee" | "ranged" | "caster" | "tank";
	/** Cosmetic tag for the Nametag component, VFX themes, etc. */
	theme?: "undead" | "goblin" | "construct" | "spirit" | "golem" | "robot" | "mechanical";
}

export const NPCMetaMap: Readonly<Record<NPCKey, NPCMeta>> = {
	BLOOD_TOAD: {
		displayName: "Blood Toad",
		modelTemplate: BloodTemplates.WaitForChild("BloodToad") as Model,
		baseStats: {
			maxHealth: 50,
			attack: 10,
			defense: 5,
			speed: 1.2,
		},
		abilities: ["fireball", "ice_shard"],
		lootTable: "ZOMBIE_COMMON",
		aiProfile: "ranged",
		theme: "goblin",
	},
	ZOMBIE: {
		displayName: "Zombie",
		modelTemplate: DecayTemplates.WaitForChild("Zombie") as Model,
		baseStats: {
			maxHealth: 60,
			attack: 15,
			defense: 7,
			speed: 1.1,
		},
		abilities: ["lightning_bolt"],
		lootTable: "ZOMBIE_COMMON",
		aiProfile: "ranged",
	},
	FATELESS: {
		displayName: "Fateless",
		modelTemplate: FatelessTemplates.WaitForChild("Fateless Master") as Model,
		baseStats: {
			maxHealth: 80,
			attack: 20,
			defense: 10,
			speed: 0.9,
		},
		abilities: ["earthquake"],
		lootTable: "ZOMBIE_COMMON",
	},
	MECHA_MONKEY: {
		displayName: "Mecha Monkey",
		modelTemplate: RobotTemplates.WaitForChild("Mecha Monkey") as Model,
		baseStats: {
			maxHealth: 120,
			attack: 25,
			defense: 15,
			speed: 1.0,
		},
		abilities: ["ice_shard", "fireball"],
		lootTable: "ZOMBIE_COMMON",
	},
	STEAM_BOT: {
		displayName: "Steam Bot",
		modelTemplate: RobotTemplates.WaitForChild("Steam Bot") as Model,
		baseStats: {
			maxHealth: 150,
			attack: 30,
			defense: 20,
			speed: 0.8,
		},
		abilities: ["lightning_bolt", "earthquake"],
		lootTable: "ZOMBIE_COMMON",
		aiProfile: "tank",
		theme: "construct",
	},
	ELEMENTAL: {
		displayName: "Elemental",
		modelTemplate: SpiritTemplates.WaitForChild("Elemental") as Model,
		baseStats: {
			maxHealth: 100,
			attack: 35,
			defense: 25,
			speed: 1.5,
		},
		abilities: ["fireball", "ice_shard", "lightning_bolt"],
		lootTable: "ZOMBIE_COMMON",
		aiProfile: "caster",
		theme: "spirit",
	},
} as const;

/* --------------------------------------------------------- NPC Names --------------------------------------------------------- */
/*──────────────────────────────────────────────────────────────────────*\
   20 first-names — mix of fantasy-friendly vowels & consonant clusters
\*──────────────────────────────────────────────────────────────────────*/
export const FIRST_NAMES = [
	"Thorg",
	"Mira",
	"Zug",
	"Elara",
	"Grim",
	"Liora",
	"Borik",
	"Sera",
	"Nok",
	"Vira",
	"Drek",
	"Tara",
	"Jax",
	"Nyra",
	"Kor",
	"Luna",
	"Riv",
	"Xara",
	"Valen",
	"Zil",
] as const;
export type FirstName = (typeof FIRST_NAMES)[number];
/*──────────────────────────────────────────────────────────────────────*\
   20 last-names — mix of fantasy-friendly endings & consonant clusters
\*──────────────────────────────────────────────────────────────────────*/
export const LAST_NAMES = [
	"Darkblade",
	"Ironfist",
	"Shadowstep",
	"Stormfang",
	"Stonebrow",
	"Nightbloom",
	"Frostwhisper",
	"Bloodthorn",
	"Dawnspear",
	"Grimscale",
	"Everflame",
	"Swiftclaw",
	"Deepforge",
	"Moonsong",
	"Bonebreaker",
	"Brightfang",
	"Blackthorn",
	"Dreamweaver",
	"Riftwalker",
	"Gloomspire",
] as const;
export type LastName = (typeof LAST_NAMES)[number];

export const MONIKERS: Readonly<Record<NPCKey, readonly string[]>> = {
	BLOOD_TOAD: ["the Filcher", "Mudfoot", "Ripfang"],
	ZOMBIE: ["the Rotting", "Flesh Eater", "Gravewalker"],
	FATELESS: ["the Unbound", "Soul Reaver", "Voidcaller"],
	MECHA_MONKEY: ["the Cogmaster", "Iron Fist", "Geargrinder"],
	STEAM_BOT: ["the Boiler", "Rustheart", "Steamwielder"],
	ELEMENTAL: ["the Stormbringer", "Flameheart", "Frostbinder"],
} as const;
