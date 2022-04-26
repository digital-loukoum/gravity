import { store } from "../api";

export function Zabu() {
	const zabu = store.math.add(3, 4);
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
