import { useMemo, useState } from "react";
import { api, store } from "./api";
import { RequestCard } from "./components/RequestCard";

function App() {
	// console.log("App is called");
	const [a, setA] = useState(2);
	const [b, setB] = useState(3);

	const [isApiLoading, setIsApiLoading] = useState(true);
	const [apiData, setApiData] = useState<number>();
	const [apiError, setApiError] = useState<Error>();

	const storeSum = store.math.add(a, b);

	useMemo(() => {
		setIsApiLoading(true);
		setApiData(undefined);
		setApiError(undefined);
		api.math.add(a, b).then(({ error, data }) => {
			setIsApiLoading(false);
			if (error) setApiError(error);
			else setApiData(data);
		});
	}, [a, b]);

	return (
		<>
			<p>
				a = <input value={a} onChange={(e) => setA(Number(e.target.value))} />
			</p>
			<p>
				b = <input value={b} onChange={(e) => setB(Number(e.target.value))} />
			</p>

			<RequestCard
				title="Api sum"
				loading={isApiLoading}
				refreshing={isApiLoading}
				data={apiData}
				error={apiError}
			/>

			<RequestCard
				title="Store sum"
				loading={storeSum.isLoading}
				refreshing={storeSum.isRefreshing}
				data={storeSum.data}
				error={storeSum.error}
				refresh={storeSum.refresh}
			/>
		</>
	);
}

export default App;
