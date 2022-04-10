import type { MaybePromise } from "source/types/MaybePromise.js";

export type OnRequestReceive<Context, Request> = (
	request: Request,
) => MaybePromise<Context>;
