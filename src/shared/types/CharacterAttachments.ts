/**
 * @file src/shared/helpers/CharacterAttachments.ts
 * @module CharacterAttachments
 * @layer Shared/Helpers
 * @description Contains utility functions for managing character attachments in the game.
 * * ╭──────────────────────────────╮
 * * │  Soul Steel · Coding Guide   │
 * * │  Fusion v4 · Strict TS · ECS │
 * * ╰──────────────────────────────╯
 * * @author       Trembus
 * * @license      MIT
 * * @since        0.1.0
 * * @lastUpdated  2025-07-11 by Trembus – Initial creation
 */

export type CharacterAttachments = Model & {
	LeftLowerArm: MeshPart & {
		LeftElbowRigAttachment: Attachment;
		LeftWristRigAttachment: Attachment;
	};

	LowerTorso: MeshPart & {
		WaistCenterAttachment: Attachment;
		LeftHipRigAttachment: Attachment;
		RootRigAttachment: Attachment;
		RightHipRigAttachment: Attachment;
		WaistRigAttachment: Attachment;
		WaistBackAttachment: Attachment;
		WaistFrontAttachment: Attachment;
	};

	Head: MeshPart & {
		HatAttachment: Attachment;
		FaceFrontAttachment: Attachment;
		HairAttachment: Attachment;
		NeckRigAttachment: Attachment;
		FaceCenterAttachment: Attachment;
	};

	UpperTorso: MeshPart & {
		LeftShoulderRigAttachment: Attachment;
		BodyBackAttachment: Attachment;
		NeckRigAttachment: Attachment;
		RightCollarAttachment: Attachment;
		RightShoulderRigAttachment: Attachment;
		BodyFrontAttachment: Attachment;
		WaistRigAttachment: Attachment;
		LeftCollarAttachment: Attachment;
		NeckAttachment: Attachment;
	};

	RightHand: MeshPart & {
		RightGripAttachment: Attachment;
		RightWristRigAttachment: Attachment;
	};

	RightUpperLeg: MeshPart & {
		RightHipRigAttachment: Attachment;
		RightKneeRigAttachment: Attachment;
	};

	RightUpperArm: MeshPart & {
		RightElbowRigAttachment: Attachment;
		RightShoulderRigAttachment: Attachment;
		RightShoulderAttachment: Attachment;
	};

	LeftUpperArm: MeshPart & {
		LeftShoulderAttachment: Attachment;
		LeftElbowRigAttachment: Attachment;
		LeftShoulderRigAttachment: Attachment;
	};

	RightLowerArm: MeshPart & {
		RightElbowRigAttachment: Attachment;
		RightWristRigAttachment: Attachment;
	};

	LeftHand: MeshPart & {
		LeftGripAttachment: Attachment;
		LeftWristRigAttachment: Attachment;
	};

	LeftFoot: MeshPart & {
		LeftAnkleRigAttachment: Attachment;
		LeftFootAttachment: Attachment;
	};

	RightFoot: MeshPart & {
		RightFootAttachment: Attachment;
		RightAnkleRigAttachment: Attachment;
	};

	RightLowerLeg: MeshPart & {
		RightAnkleRigAttachment: Attachment;
		RightKneeRigAttachment: Attachment;
	};

	LeftUpperLeg: MeshPart & {
		LeftHipRigAttachment: Attachment;
		LeftKneeRigAttachment: Attachment;
	};

	LeftLowerLeg: MeshPart & {
		LeftKneeRigAttachment: Attachment;
		LeftAnkleRigAttachment: Attachment;
	};
};
