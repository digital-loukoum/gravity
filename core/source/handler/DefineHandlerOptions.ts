import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import { Authorize } from "./Authorize";
import { OnRequestReceive } from "./OnRequestReceive";
import { OnResponseSend } from "./OnResponseSend";

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
