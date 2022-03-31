import type { IncomingMessage, ServerResponse } from "http";
import { Type } from "typezer";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import { GravityAuthorizeFunction } from "../types/GravityAuthorizeFunction";
import { MaybePromise } from "../types/MaybePromise";

export type GravityMiddleware<
	Request = IncomingMessage,
	Response = ServerResponse,
> = <Context = undefined>(
	configuration: {
		services: Record<string, BaseServiceConstructor<Context>>;
		schema: Record<string, any>;
		apiPath?: string;
		verbose?: boolean;
		onResponseSend?: (response: Response) => unknown;
		authorize?: GravityAuthorizeFunction<Context>;
		allowedOrigins?: string[];
	} & (Context extends undefined
		? { onRequestReceive?: (request: Request) => MaybePromise<Context> }
		: {
				onRequestReceive: (request: Request) => MaybePromise<Context>;
		  }),
) => any;
