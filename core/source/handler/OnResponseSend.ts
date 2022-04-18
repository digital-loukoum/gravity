import type { MaybePromise } from "../types/MaybePromise.js";

export type OnResponseSend<Response> = (options: {
	response: Response;
}) => MaybePromise<Response | undefined>;
