import type { MaybePromise } from "source/types/MaybePromise.js";

export type OnResponseSend<Response> = (
	response: Response,
) => MaybePromise<Response | undefined>;
