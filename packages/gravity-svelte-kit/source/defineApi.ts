import { defineApi as defineSvelteApi } from "@digitak/gravity-svelte/defineApi";
import type { LoadInput, LoadOutput } from "@sveltejs/kit";
import type { Api } from "@digitak/gravity/api/Api";
import type { MaybePromise } from "@digitak/gravity/types/MaybePromise";
import type { ServicesRecord } from "@digitak/gravity";

type DefineApiParameters = Parameters<typeof defineSvelteApi>;

type DefineApiReturnType<Services extends ServicesRecord<any>> = ReturnType<
	typeof defineSvelteApi
> & {
	loader: <
		Params extends Record<string, string> = Record<string, string>,
		InputProps extends Record<string, any> = Record<string, any>,
		OutputProps extends Record<string, any> = InputProps,
	>(
		loader: (
			input: LoadInput<Params, InputProps> & {
				api: Api<Services>;
			},
		) => MaybePromise<LoadOutput<OutputProps>>,
	) => (
		input: LoadInput<Params, InputProps>,
	) => MaybePromise<LoadOutput<OutputProps>>;
};

export function defineApi<Services extends ServicesRecord<any>>(
	...parameters: DefineApiParameters
): DefineApiReturnType<Services> {
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
