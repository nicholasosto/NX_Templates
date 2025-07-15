import Fusion from "@rbxts/fusion";

export const Padding = (amount: number) => {
	return Fusion.New("UIPadding")({
		Name: "Padding",
		PaddingLeft: new UDim(0, amount),
		PaddingRight: new UDim(0, amount),
		PaddingTop: new UDim(0, amount),
		PaddingBottom: new UDim(0, amount),
	});
};
