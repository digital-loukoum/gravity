import type { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import type { Authorize } from "./Authorize";
import type { OnRequestReceive } from "./OnRequestReceive";
import type { OnResponseSend } from "./OnResponseSend";

export type DefineHandlerOptions<Context, Request, Response> = {
	services: Record<string, BaseServiceConstructor<Context>>;
	schema: Record<string, any>;
	apiPath?: string;
	verbose?: boolean;
	onResponseSend?: OnResponseSend<Response>;
	authorize?: Authorize<Context>;
	allowedOrigins?: string[];
} & (Context extends undefined
	? { onRequestReceive?: OnRequestReceive<Context, Request> }
	: {
			onRequestReceive: OnRequestReceive<Context, Request>;
	  });
