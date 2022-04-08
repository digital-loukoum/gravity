import type { MaybePromise } from "source/types/MaybePromise";

export type OnResponseSend<Response> = (
	response: Response,
) => MaybePromise<Response | undefined>;
