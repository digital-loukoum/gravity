import type { MaybePromise } from "../types/MaybePromise.js";

export type OnResponseSend<Response> = (
	response: Response,
) => MaybePromise<Response | undefined>;
