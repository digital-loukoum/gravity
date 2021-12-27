import { bunker, debunker } from "@digitak/bunker";
import type {
	BaseService,
	BaseServiceConstructor,
} from "../services/BaseService";
import { MaybePromise } from "../types/MaybePromise";
import { isBrowser } from "../utilities/isBrowser";
import { apiProxy } from "./apiProxy";
import type { Instance } from "../types/Instance";
import { Promisify } from "../types/Promisify";

export type DefineApiOptions = {
	apiPath?: string;
	onRequestSend?: (request: RequestInit) => MaybePromise<RequestInit>;
	onResponseReceive?: (response: Response) => MaybePromise<Response>;
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

export function defineApi<
	Services extends Record<string, BaseServiceConstructor>,
>({
	apiPath = "/api",
	onRequestSend,
	onResponseReceive,
}: DefineApiOptions = {}): Api<Services> {
	return apiProxy(async (service, operation, properties) => {
		// on a non-browser environment, we return a promise that never resolves
		if (!isBrowser()) return new Promise(() => {});

		const headers = new Headers();
		headers.append("Content-Type", "x-bunker");

		// define the base request object and pass it to the onRequestSend middleware
		let request: RequestInit = {
			method: "POST",
			headers,
			body: bunker({ service, operation, properties }),
		};
		await onRequestSend?.(request);

		// fetch the server with the resulting request
		let response = await fetch(apiPath, request);
		await onResponseReceive?.(response);

		// TODO: should return an error object
		if (!response.ok) return undefined;

		// we receive a JSON object unless "x-bunker" content type is specified
		if (response.headers.get("Content-Type") == "x-bunker") {
			return debunker(new Uint8Array(await response.arrayBuffer()));
		}
		return (await response.json()) as unknown;
	}) as Api<Services>;
}
