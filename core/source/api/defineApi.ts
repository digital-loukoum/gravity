import { bunker, debunker } from "@digitak/bunker";
import { BaseService } from "../services/BaseService";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import { isBrowser } from "../utilities/isBrowser";
import { apiProxy } from "./apiProxy";
import { Promisify } from "../types/Promisify";
import { normalizePath } from "../middleware/normalizePath";
import { Instance } from "../types/Instance";

export type DefineApiOptions = {
	apiPath?: string;
	onRequestSend?: (request: RequestInit) => unknown;
	onResponseReceive?: (response: Response) => unknown;
};

type ApiService<Service extends BaseService> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (...args: Parameters<Service[Key]>) => Promisify<ReturnType<Service[Key]>>
		: never;
};

export type Api<Services extends Record<string, BaseServiceConstructor>> = {
	[Key in keyof Services]: ApiService<Instance<Services[Key]>>;
};

export type CallApiOptions = {
	from: "browser" | "server";
};

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>({
	apiPath = "/api",
	onRequestSend,
	onResponseReceive,
}: DefineApiOptions = {}) {
	apiPath = normalizePath(apiPath);

	const callApi = ({ from }: CallApiOptions) =>
		<Api<Services>>apiProxy(async (service, operation, properties) => {
			if ((isBrowser() ? "browser" : "server") != from) {
				// on an unwanted environment, we return a promise that never resolves
				return new Promise(() => {});
			}

			const headers = new Headers();
			headers.append("Content-Type", "x-bunker");

			// define the base request object and pass it to the onRequestSend middleware
			let request: RequestInit = {
				method: "POST",
				headers,
				body: properties?.length ? bunker(properties) : null,
			};
			await onRequestSend?.(request);

			// fetch the server with the resulting request
			let response = await fetch(`${apiPath}${service}/${operation}`, request);
			await onResponseReceive?.(response);

			// TODO: should return an error object
			if (!response.ok) return undefined;

			// we receive a JSON object unless "x-bunker" content type is specified
			if (response.headers.get("Content-Type") == "x-bunker") {
				return debunker(new Uint8Array(await response.arrayBuffer()));
			}
			return (await response.json()) as unknown;
		});

	const apiClient = callApi({ from: "browser" });
	const apiServer = callApi({ from: "server" });
	const api = apiClient;

	return { api, apiClient, apiServer, callApi };
}
