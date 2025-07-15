import { ReplicatedStorage } from "@rbxts/services";

let projectilesFolder = ReplicatedStorage.FindFirstChild("Projectiles", true);
while (!projectilesFolder) {
	task.wait(0.2);
	print("Waiting for Projectiles folder to be available...");
	projectilesFolder = ReplicatedStorage.FindFirstChild("Projectiles", true);
	if (!projectilesFolder) {
		continue;
	}
}
warn(`Projectiles folder found: ${projectilesFolder.GetFullName()}`);

export const ProjectileKeys = ["IceShard", "Fireball", "LightningBolt"] as const;
export type ProjectileKey = (typeof ProjectileKeys)[number];

/** Blueprint for a projectile archetype. */
export interface ProjectileDefinition {
	readonly part: BasePart; // the part that represents the projectile
	readonly speed: number; // studs per second
	readonly damage: number; // damage dealt on hit
	readonly lifetime: number; // seconds before despawn
	readonly tweenInfo: TweenInfo; // tweening properties for movement
	readonly physicsType?: "Pull" | "Repel" | "Chain"; // how it interacts with other objects
	readonly onTick?: (projectile: BasePart, dt: number) => void; // runtime hook
	readonly onStart?: (projectile: BasePart) => void; // called when projectile
	readonly onHit?: (projectile: BasePart, target: BasePart) => void; // called when hitting a target
	readonly onEnd?: (projectile: BasePart) => void; // called when projectile despawns
}

export const ProjectileCatalog = {
	IceShard: <ProjectileDefinition>{
		part: projectilesFolder.FindFirstChild("Fireball_Epic") as BasePart,
		color: new Color3(0.8, 0.9, 1),
		speed: 100,
		damage: 20,
		lifetime: 5,
		physicsType: "Pull",
		tweenInfo: new TweenInfo(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
		onTick: (projectile, dt) => {
			// Add ice shard specific behavior here
			//projectile.Velocity = projectile.CFrame.LookVector.mul(projectile.Speed);
		},
		onStart: (projectile) => {
			print("IceShard started");
		},
		onHit: (projectile, target) => {
			print(`IceShard hit ${target.Name}`);
			//target.TakeDamage(projectile.Damage);
		},
		onEnd: (projectile) => {
			print("IceShard despawned");
			projectile.Destroy();
		},
	},
	Fireball: <ProjectileDefinition>{
		part: projectilesFolder.FindFirstChild("Fireball_Epic") as BasePart,
		color: new Color3(1, 0.5, 0),
		speed: 120,
		damage: 30,
		lifetime: 4,
		physicsType: "Repel",
		tweenInfo: new TweenInfo(0.3, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true),
		onTick: (projectile, dt) => {
			// Add fireball specific behavior here
			//projectile.Velocity = projectile.CFrame.LookVector.mul(projectile.Speed);
		},
		onStart: (projectile) => {
			print("Fireball started");
		},
		onHit: (projectile, target) => {
			print(`Fireball hit ${target.Name}`);
			//target.TakeDamage(projectile.Damage);
		},
		onEnd: (projectile) => {
			print("Fireball despawned");
			projectile.Destroy();
		},
	},
	LightningBolt: <ProjectileDefinition>{
		part: projectilesFolder.FindFirstChild("Fireball_Epic") as BasePart,
		color: new Color3(1, 1, 0),
		speed: 150,
		damage: 40,
		lifetime: 3,
		physicsType: "Chain",
		tweenInfo: new TweenInfo(0.2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true),
		onTick: (projectile, dt) => {
			// Add lightning bolt specific behavior here
			//projectile.Velocity = projectile.CFrame.LookVector.mul(projectile.Speed);
		},
		onStart: (projectile) => {
			print("LightningBolt started");
		},
		onHit: (projectile, target) => {
			print(`LightningBolt hit ${target.Name}`);
			//target.TakeDamage(projectile.Damage);
		},
		onEnd: (projectile) => {
			print("LightningBolt despawned");
			projectile.Destroy();
		},
	},
} as const;
