import { defineApi as defineSvelteApi } from "@digitak/gravity-svelte/defineApi";
import type {
	RequestHandler,
	RequestHandlerOutput,
	LoadInput,
	LoadOutput,
	ResponseBody,
} from "@sveltejs/kit";
import type { Api } from "@digitak/gravity/api/Api";
import type { MaybePromise } from "@digitak/gravity/types/MaybePromise";
import type { ServicesRecord } from "@digitak/gravity";

export type HandlerParameters<
	Services extends ServicesRecord<any>,
	Params extends Record<string, string>,
> = Parameters<RequestHandler<Params>>[0] & {
	api: Api<Services>;
};

export type HandlerReturnType<Output extends ResponseBody = ResponseBody> =
	MaybePromise<RequestHandlerOutput<Output>>;

type DefineApiParameters = Parameters<typeof defineSvelteApi>;

type DefineApiReturnType<Services extends ServicesRecord<any>> = ReturnType<
	typeof defineSvelteApi
> & {
	handler: <
		Params extends Record<string, string> = Record<string, string>,
		Output extends ResponseBody = ResponseBody,
	>(
		handler: (
			event: HandlerParameters<Services, Params>,
		) => HandlerReturnType<Output>,
	) => RequestHandler<Params, Output>;

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
	const __coreAPi = defineSvelteApi<Services>(...parameters);
	const { api, callApi, resolveApiCall } = __coreAPi;
	return {
		...__coreAPi,
		handler: (handler) => (event) => {
			// TODO: api does not go through the gravity middleware
			return handler({ ...event, api });
		},
		loader: (loader) => (input) => {
			return loader({
				...input,
				api: callApi({ fetcher: input.fetch as any }),
			});
		},
	};
}
