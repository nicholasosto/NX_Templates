import { Computed } from "@rbxts/fusion";

export function reactiveWidth(percent: Computed<number>): Computed<UDim2> {
	return Computed(() => {
		const value = percent.get();
		return new UDim2(value, 0, 1, 0);
	});
}
