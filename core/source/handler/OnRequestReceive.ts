import type { MaybePromise } from "../types/MaybePromise.js";

export type OnRequestReceive<Context, Request> = (options: {
	request: Request;
	cookies: Record<string, string>;
}) => MaybePromise<Context>;
