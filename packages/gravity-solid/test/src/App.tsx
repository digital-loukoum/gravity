import { Component, createMemo, createSignal } from "solid-js";
import { api, store } from "./api";
import { RequestCard } from "./components/RequestCard";

const App: Component = () => {
	const [a, setA] = createSignal(2);
	const [b, setB] = createSignal(3);

	const [isApiLoading, setIsApiLoading] = createSignal(true);
	const [apiData, setApiData] = createSignal<number>();
	const [apiError, setApiError] = createSignal<Error>();

	const storeSum = createMemo(() => store.math.add(a(), b()));

	api.math.add(a(), b()).then(({ error, data }) => {
		if (error) setApiError(error);
		else setApiData(data);
	});

	createMemo(() => {
		setIsApiLoading(true);
		setApiData(undefined);
		setApiError(undefined);
		api.math.add(a(), b()).then(({ error, data }) => {
			setIsApiLoading(false);
			if (error) setApiError(error);
			else setApiData(data);
		});
	});

	return (
		<>
			<p>
				a ={" "}
				<input
					value={a()}
					onInput={(e) => setA(Number((e.target as any).value))}
				/>
			</p>
			<p>
				b ={" "}
				<input
					value={b()}
					onInput={(e) => setB(Number((e.target as any).value))}
				/>
			</p>

			<RequestCard
				title="Api sum"
				loading={isApiLoading()}
				refreshing={isApiLoading()}
				data={apiData()}
				error={apiError()}
			/>

			<RequestCard
				title="Store sum"
				loading={storeSum().isLoading}
				refreshing={storeSum().isRefreshing}
				data={storeSum().data}
				error={storeSum().error}
			/>
		</>
	);
};

export default App;
