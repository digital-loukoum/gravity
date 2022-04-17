import type { MaybePromise } from "../types/MaybePromise.js";

export type OnRequestReceive<Context, Request> = (
	request: Request,
) => MaybePromise<Context>;
