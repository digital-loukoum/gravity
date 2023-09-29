import type { BaseServiceConstructor } from "../index.js";
import type { MaybePromise } from "../types/MaybePromise.js";

export type OnRequestReceive<Context, Request> = (options: {
	request: Request;
	cookies: Record<string, string>;
	service: BaseServiceConstructor<Context>;
	path: string[];
}) => MaybePromise<Context>;
