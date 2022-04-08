import { MaybePromise } from "source/types/MaybePromise";

export type OnRequestReceive<Context, Request> = (
	request: Request,
) => MaybePromise<Context>;
