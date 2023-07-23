import type { BaseServiceConstructor } from "../index.js";
import type { MaybePromise } from "../types/MaybePromise.js";

export type SetContentType<Context, Request> = (options: {
	context: Context;
	request: Request;
	cookies: Record<string, string>;
	service: BaseServiceConstructor<Context>;
	path: string[];
}) => MaybePromise<string>;
