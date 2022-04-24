import type { MaybePromise } from "../types/MaybePromise.js";

export type OnResponseSend<Context, Response> = (options: {
	context: Context;
	response: Response;
}) => MaybePromise<Response | undefined>;
