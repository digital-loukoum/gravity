import { bunker, debunker } from "@digitak/bunker";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import { apiProxy } from "./apiProxy";
import { normalizePath } from "../middleware/normalizePath";
import { Api } from "./Api";
import { MaybePromise } from "source/types/MaybePromise";

export type DefineApiOptions = {
	apiPath?: string;
	onRequestSend?: (
		request: RequestInit,
	) => MaybePromise<RequestInit | undefined>;
	onResponseReceive?: (
		response: Response,
	) => MaybePromise<Response | undefined>;
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
		apiProxy<Api<Services>>(async (service, path, properties) => {
			const headers = new Headers();
			headers.append("Content-Type", "x-bunker");

			// define the base request object and pass it to the onRequestSend middleware
			let request: RequestInit = {
				method: "POST",
				headers,
				body: properties?.length ? bunker(properties) : null,
			};
			request = (await onRequestSend?.(request)) ?? request;

			// fetch the server with the resulting request
			let response = await options.fetcher(
				`${apiPath}${service}/${path.join("/")}`,
				request,
			);
			response = (await onResponseReceive?.(response)) ?? response;

			// TODO: should return an error object
			if (!response.ok) return undefined;

			// we receive a JSON object unless "x-bunker" content type is specified
			if (response.headers.get("Content-Type") == "x-bunker") {
				return debunker(new Uint8Array(await response.arrayBuffer()));
			}
			return (await response.json()) as unknown;
		});

	const api = callApi({
		fetcher: fetch,
	});

	return { api, callApi };
}
