import { New } from "@rbxts/fusion";

export function CornerRadius(radius: number) {
	return New("UICorner")({
		CornerRadius: new UDim(0, radius),
	});
}
