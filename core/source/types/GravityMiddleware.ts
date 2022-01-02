import type { IncomingMessage, ServerResponse } from "http";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import { GravityAuthorizeFunction } from "./GravityAuthorizeFunction";
import { MaybePromise } from "./MaybePromise";

type OnRequestReceive<Context> = (request: IncomingMessage) => MaybePromise<{
	request: IncomingMessage;
	context: Context;
}>;

export type GravityMiddleware<Response = ServerResponse> = <
	Context = undefined,
>(
	input: {
		services: Record<string, BaseServiceConstructor<Context>>;
		apiPath?: string;
		onResponseSend?: (response: Response) => MaybePromise<Response>;
		authorize?: GravityAuthorizeFunction<Context>;
	} & (Context extends undefined
		? { onRequestReceive?: (request: IncomingMessage) => MaybePromise<Context> }
		: {
				onRequestReceive: (request: IncomingMessage) => MaybePromise<Context>;
		  }),
) => any;
