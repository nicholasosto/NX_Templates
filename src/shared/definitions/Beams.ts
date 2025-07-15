import { GameImages } from "shared/assets";

/**
 * @file        BeamDefinition.ts
 * @module      BeamDefinition
 * @layer       Shared/Definitions
 * @description Static metadata for each beam archetype used by the factory.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author        Trembus
 * @license       MIT
 * @since         0.2.1
 * @lastUpdated   2025-07-11 – Added sample beam catalog (3 entries)
 */
export const BeamPhysicsType = ["None", "Pull", "Repel", "Chain"] as const;
export type BeamPhysicsType = (typeof BeamPhysicsType)[number];

/** Blueprint for a beam archetype. */
export interface BeamDefinition {
	readonly texture?: string;
	readonly color: ColorSequence;
	readonly width0: number;
	readonly width1: number;
	readonly segments?: number;
	readonly lifetime: number; // seconds
	readonly tweenInfo?: TweenInfo; // optional pulse / wobble
	readonly physicsType?: BeamPhysicsType; // how it interacts with other objects
	readonly onTick?: (beam: Beam, dt: number) => void; // runtime hook
	readonly onStart?: (beam: Beam) => void; // called when beam is created
	readonly onEnd?: (beam: Beam) => void; // called when beam is destroyed
}

/**
 * Central catalogue of beams.
 * Extend or replace at data‑load time if you allow designer auth assets.
 */
export const BeamCatalog = {
	/**
	 * Blood‑red constrictor that pulses wider then shrinks, simulating a snake.
	 */
	Constrictor: <BeamDefinition>{
		texture: GameImages.Beam.Constrictor_1,
		color: new ColorSequence(Color3.fromRGB(180, 40, 40), Color3.fromRGB(80, 5, 5)),
		width0: 0.4,
		width1: 0.4,
		lifetime: 115,
		physicsType: "Pull",
		segments: 20,
		onTick: (beam, dt) => {
			// Pulse effect: widen then shrink
			const pulse = math.sin(tick() * 2) * 0.1 + 0.1; // oscillate between 0.1 and 0.2
			beam.Width0 = beam.Width1 = 0.4 + pulse;
		},
		tweenInfo: new TweenInfo(0.6, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
	},

	/**
	 * Violet soul‑drain beam that slowly narrows while draining.
	 */
	SoulDrain: <BeamDefinition>{
		texture: GameImages.Beam.SoulDrain_1,
		color: new ColorSequence(Color3.fromRGB(140, 0, 255), Color3.fromRGB(60, 0, 80)),
		width0: 0.3,
		width1: 0.15,
		lifetime: 116,
		physicsType: "Chain",
		tweenInfo: new TweenInfo(0.8, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true),
		segments: 15,
		onTick: (beam, dt) => {
			// Gradually thin out to emphasise depletion
			beam.Width0 = math.max(0.05, beam.Width0 - dt * 0.02);
			beam.Width1 = beam.Width0;
		},
	},

	/**
	 * Icy chain that flickers between light blue & white segments.
	 */
	IceChain: <BeamDefinition>{
		texture: GameImages.Beam.IceChain_1,
		color: new ColorSequence(Color3.fromRGB(200, 235, 255), Color3.fromRGB(150, 220, 255)),
		width0: 2.25,
		width1: 1.25,
		segments: 10,
		lifetime: 5,
		physicsType: "Repel",
		tweenInfo: new TweenInfo(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.InOut, -1, true),
		// Flickering effect to simulate ice shards
		onTick: (beam, dt) => {
			// shimmer by offsetting texture
			beam.TextureSpeed = 2;
		},
		onStart: (beam) => {
			// Initial shimmer effect
			const forceVector = new Instance("VectorForce");
			forceVector.Force = new Vector3(0, 0, 0);
			forceVector.RelativeTo = Enum.ActuatorRelativeTo.Attachment0;
			forceVector.Attachment0 = beam.Attachment0;
			forceVector.Attachment1 = beam.Attachment1;
			forceVector.Parent = beam.Parent; // Attach to the beam's parent
			forceVector.Enabled = true;
			task.delay(0.1, () => {
				forceVector.Force = new Vector3(0, 4000, 0); // Apply upward force
			});
		},
		onEnd: (beam) => {
			// Cleanup force vector
			warn(`Beam ended: ${beam.Name}`);
			beam.Parent?.GetChildren().forEach((child) => {
				if (child.IsA("VectorForce")) {
					child.Destroy();
				}
			});
		},
	},
} as const;

export type BeamKey = keyof typeof BeamCatalog;
