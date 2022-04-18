import { bunker, debunker } from "@digitak/bunker";
import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import type { Api } from "./Api.js";
import { apiProxy } from "./apiProxy.js";
import { normalizePath } from "../utilities/normalizePath.js";
import type { OnRequestSend } from "./OnRequestSend.js";
import type { OnResponseReceive } from "./OnResponseReceive.js";
import type { ApiResponse } from "./ApiResponse.js";

export type DefineApiOptions = {
	apiPath?: string;
	onRequestSend?: OnRequestSend;
	onResponseReceive?: OnResponseReceive;
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

			// define the base request object and pass it to the onRequestSend middleware
			let request: RequestInit = {
				method: "POST",
				headers,
				body,
			};
			request = (await onRequestSend?.({ request })) ?? request;

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

			const result: ApiResponse = response.ok
				? { data }
				: { error: data as Error };
			await onResponseReceive?.({ response, ...result });
			return result;
		});

	const api = callApi({
		fetcher: fetch,
	});

	return { api, callApi };
}
