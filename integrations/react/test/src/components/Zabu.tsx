import { useStore } from "@digitak/gravity-react/useStore";

export function Zabu() {
	const zabu = useStore("zabu");
	console.log("Zabu", zabu);

	return (
		<span>
			<button style={{ marginRight: "8px" }} onClick={() => zabu.refresh()}>
				Refresh
			</button>
			<>Zabu is: {zabu.data}</>
		</span>
	);
}
