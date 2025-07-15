import { New } from "@rbxts/fusion";

export function AspectRatio(ratio: number) {
	const aspectRatioConstraint = New("UIAspectRatioConstraint")({
		AspectRatio: ratio,
		AspectType: Enum.AspectType.FitWithinMaxSize,
	});
	return aspectRatioConstraint;
}

export function SquareRatio() {
	return AspectRatio(1);
}

export function HorizontalRatio() {
	return AspectRatio(16 / 9);
}
