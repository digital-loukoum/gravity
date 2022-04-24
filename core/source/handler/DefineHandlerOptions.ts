import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import type { Authorize } from "./Authorize.js";
import type { OnRequestReceive } from "./OnRequestReceive.js";
import type { OnResponseSend } from "./OnResponseSend.js";

export type DefineHandlerOptions<Context, Request, Response> = {
	services: Record<string, BaseServiceConstructor<Context>>;
	schema: Record<string, any>;
	apiPath?: string;
	verbose?: boolean;
	onResponseSend?: OnResponseSend<Context, Response>;
	authorize?: Authorize<Context>;
	allowedOrigins?: string[];
} & (Context extends undefined
	? { onRequestReceive?: OnRequestReceive<Context, Request> }
	: {
			onRequestReceive: OnRequestReceive<Context, Request>;
	  });
