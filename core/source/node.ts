import type { IncomingMessage, ServerResponse } from "http";
import type { DefineHandlerOptions } from "./handler/DefineHandlerOptions.js";
import { defineHandler as defineHandlerMiddleware } from "./middleware.js";

/**
 * Default handler for node taht returns 404 if apiPath is not matched
 */
export const defineHandler = <Context>(
	options: DefineHandlerOptions<Context, IncomingMessage, ServerResponse>,
) => {
	const defined = defineHandlerMiddleware(options);
	const handler = async (
		request: IncomingMessage,
		response: ServerResponse,
	) => {
		defined.handler(request, response, () => response.writeHead(404).end());
	};
	return { ...defined, handler };
};
