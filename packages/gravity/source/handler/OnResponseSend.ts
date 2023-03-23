import type { ApiResponse } from "../index.js";
import type { MaybePromise } from "../types/MaybePromise.js";

export type OnResponseSend<Context, Response> = (options: ApiResponse & {
	context: Context;
	response: Response;
}) => MaybePromise<Response | undefined>;
