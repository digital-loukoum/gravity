import type { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import type { Api } from "./Api";
import type { MaybePromise } from "source/types/MaybePromise";
import { bunker, debunker } from "@digitak/bunker";
import { apiProxy } from "./apiProxy";
import { normalizePath } from "../utilities/normalizePath";

export type DefineApiOptions = {
	apiPath?: string;
	onRequestSend?: (
		request: RequestInit,
	) => MaybePromise<RequestInit | undefined>;
	onResponseReceive?: (response: Response) => unknown;
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

			// define the base request object and pass it to the onRequestSend middleware
			let request: RequestInit = {
				method: "POST",
				headers,
				body: properties?.length ? bunker(properties) : null,
			};
			request = (await onRequestSend?.(request)) ?? request;

			// fetch the server with the resulting request
			let response = await options.fetcher(
				`${apiPath}${service}/${target}}`,
				request,
			);

			// we receive a JSON object unless "application/bunker" content type is specified
			let data;
			if (response.headers.get("Content-Type") == "application/bunker") {
				data = debunker(new Uint8Array(await response.arrayBuffer()));
			} else {
				data = (await response.json()) as unknown;
			}

			await onResponseReceive?.(response);

			return response.ok ? { data } : { error: data };
		});

	const api = callApi({
		fetcher: fetch,
	});

	return { api, callApi };
}
