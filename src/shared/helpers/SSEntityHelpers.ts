import { CollectionService, PhysicsService, Workspace } from "@rbxts/services";
import { SSEntity } from "shared/types/SSEntity";

export type RigInfo = {
	rigId: string;
	rig: SSEntity;
	distance: number;
	team?: string;
};

export namespace SSEntityHelper {
	/** Returns every rig inside radius. Falls back to registry scan if Octree absent. */
	export function getRigsInRadius(origin: CFrame, radius: number): RigInfo[] {
		warn(`Getting rigs in radius ${radius} from ${origin.Position}`);
		const ssEntities = CollectionService.GetTagged("SSEntity") as SSEntity[];
		return ssEntities.reduce<RigInfo[]>((acc, rig) => {
			if ((rig as SSEntity) === undefined) {
				return acc;
			}
			const rigPosition = rig.GetPivot().Position;
			const distance = rigPosition.sub(origin.Position).Magnitude;
			if (distance <= radius) {
				acc.push({ rigId: rig.GetFullName(), rig, distance });
			}
			return acc;
		}, []);
	}

	export function getClosestRig(playerCharacter: SSEntity, origin: CFrame, radius = math.huge): RigInfo | undefined {
		let bestRig: RigInfo | undefined = undefined;
		let bestDist = radius;

		const rigs = getRigsInRadius(origin, radius);
		rigs.forEach((rig) => {
			if (rig.distance < bestDist) {
				bestDist = rig.distance;
				bestRig = rig;
			}
		});
		return bestRig;
	}

	export function getUnanchoredPartsInRadius(origin: CFrame, radius: number): { part: BasePart; distance: number }[] {
		const parts = Workspace.GetDescendants().filter((descendant) => {
			return descendant.IsA("BasePart") && !descendant.Anchored;
		});
		return parts.reduce<{ part: BasePart; distance: number }[]>((acc, part) => {
			const basePart = part as BasePart;
			const distance = basePart.GetPivot().Position.sub(origin.Position).Magnitude;
			if (distance <= radius) {
				acc.push({ part: basePart, distance });
			}
			return acc;
		}, []);
	}

	export function pushUnanchoredPartsInRadius(origin: CFrame, radius: number): void {
		const unanchoredParts = getUnanchoredPartsInRadius(origin, radius);
		unanchoredParts.forEach(({ part }) => {
			const force = new Instance("VectorForce");
			const attachment = new Instance("Attachment");
			attachment.Parent = part;
			force.Attachment0 = attachment;
			force.Force = new Vector3(0, 1000, 0);
			force.ApplyAtCenterOfMass = true;
			force.Parent = part;
			force.Enabled = true;
			task.delay(1, () => {
				force.Destroy();
				attachment.Destroy();
			});
		});
	}
}
