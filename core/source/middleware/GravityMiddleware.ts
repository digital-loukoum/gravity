import type { IncomingMessage, ServerResponse } from "http";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import { GravityAuthorizeFunction } from "../types/GravityAuthorizeFunction";
import { MaybePromise } from "../types/MaybePromise";

export type GravityMiddleware<
	Request = IncomingMessage,
	Response = ServerResponse,
> = <Context = undefined>(
	configuration: {
		services: Record<string, BaseServiceConstructor<Context>>;
		apiPath?: string;
		verbose?: boolean;
		onResponseSend?: (response: Response) => MaybePromise<Response>;
		authorize?: GravityAuthorizeFunction<Context>;
	} & (Context extends undefined
		? { onRequestReceive?: (request: Request) => MaybePromise<Context> }
		: {
				onRequestReceive: (request: Request) => MaybePromise<Context>;
		  }),
) => any;
