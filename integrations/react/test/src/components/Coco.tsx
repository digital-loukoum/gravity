import { useStore } from "@digitak/gravity-react/useStore";

export function Coco() {
	const coco = useStore("coco");
	console.log("Coco", coco);

	return (
		<span>
			<button style={{ marginRight: "8px" }} onClick={() => coco.refresh()}>
				Refresh
			</button>
			<>Coco is: {coco.data}</>
		</span>
	);
}
