import { bunker, debunker } from "@digitak/bunker";
import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import type { Api } from "./Api.js";
import type { MaybePromise } from "../types/MaybePromise.js";
import { apiProxy } from "./apiProxy.js";
import { normalizePath } from "../utilities/normalizePath.js";

export type DefineApiOptions = {
	apiPath?: string;
	onRequestSend?: (
		request: RequestInit,
	) => MaybePromise<RequestInit | undefined>;
	onResponseReceive?: (response: Response, data: unknown) => unknown;
};

export type CallApiOptions = {
	fetcher: typeof fetch;
};

export type DefineApiResult<
	Services extends Record<string, BaseServiceConstructor>,
> = {
	api: Api<Services>;
	callApi: (options: CallApiOptions) => Api<Services>;
};

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>({
	apiPath = "/api",
	onRequestSend,
	onResponseReceive,
}: DefineApiOptions = {}): DefineApiResult<Services> {
	apiPath = normalizePath(apiPath);

	const callApi = (options: CallApiOptions) =>
		apiProxy<Api<Services>>(async (service, target, properties) => {
			const headers = new Headers();
			headers.append("Content-Type", "application/bunker");
			const body = properties?.length ? bunker(properties) : null;
			console.log("Sending request", service, target, properties, body);

			// define the base request object and pass it to the onRequestSend middleware
			let request: RequestInit = {
				method: "POST",
				headers,
				body,
			};
			request = (await onRequestSend?.(request)) ?? request;

			// fetch the server with the resulting request
			let response = await options.fetcher(
				`${apiPath}${service}/${target}`,
				request,
			);

			// we receive a JSON object unless "application/bunker" content type is specified
			let data;

			if (response.headers.get("Content-Type") == "application/bunker") {
				data = debunker(new Uint8Array(await response.arrayBuffer()));
			} else {
				data = (await response.json()) as unknown;
			}

			await onResponseReceive?.(response, data);

			return response.ok ? { data } : { error: data };
		});

	const api = callApi({
		fetcher: fetch,
	});

	return { api, callApi };
}
