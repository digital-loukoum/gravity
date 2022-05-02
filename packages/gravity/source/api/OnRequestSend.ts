import type { MaybePromise } from "../types/MaybePromise.js";

export type OnRequestSend = (options: {
	request: RequestInit;
}) => MaybePromise<RequestInit | undefined>;
