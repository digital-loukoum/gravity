import { defineApi as defineSvelteApi } from "@digitak/gravity-svelte/defineApi";
import type { LoadEvent, LoadOutput } from "@sveltejs/kit";
import type { Api } from "@digitak/gravity/api/Api";
import type { MaybePromise } from "@digitak/gravity/types/MaybePromise";
import type { ServicesRecord } from "@digitak/gravity";
import type { DefineStoreResult } from "@digitak/gravity/store/defineStore";
import type { StoreProxy } from "@digitak/gravity-svelte/StoreProxy";

type DefineApiParameters = Parameters<typeof defineSvelteApi>;

type ApiLoader<Services extends ServicesRecord<any>> = {
	loader: <
		Params extends Record<string, string> = Record<string, string>,
		InputProps extends Record<string, any> = Record<string, any>,
		OutputProps extends Record<string, any> = InputProps,
	>(
		loader: (
			input: LoadEvent<Params, InputProps> & {
				api: Api<Services>;
			},
		) => MaybePromise<LoadOutput<OutputProps>>,
	) => (
		input: LoadEvent<Params, InputProps>,
	) => MaybePromise<LoadOutput<OutputProps>>;
};

export function defineApi<Services extends ServicesRecord<any>>(
	...parameters: DefineApiParameters
): DefineStoreResult<Services, StoreProxy<Services>> & ApiLoader<Services> {
	const coreAPi = defineSvelteApi<Services>(...parameters);
	const { callApi } = coreAPi;
	return {
		...coreAPi,
		loader: (loader) => (input) => {
			return loader({
				...input,
				api: callApi({ fetcher: input.fetch as any }),
			});
		},
	};
}
