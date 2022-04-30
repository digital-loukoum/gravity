import type { IncomingMessage, ServerResponse } from "http";
import type { DefineHandlerOptions } from "./handler/DefineHandlerOptions.js";
import type { ServicesRecord } from "./handler/ServicesRecord.js";
import { defineHandler as defineHandlerMiddleware } from "./middleware.js";

/**
 * Default handler for node taht returns 404 if apiPath is not matched
 */
export const defineHandler = <
	Services extends ServicesRecord<Context>,
	Context = undefined,
>(
	options: DefineHandlerOptions<
		Context,
		Services,
		IncomingMessage,
		ServerResponse
	>,
) => {
	const coreHandler = defineHandlerMiddleware(options);
	const { handler } = coreHandler;

	return {
		...coreHandler,
		handler: async (request: IncomingMessage, response: ServerResponse) =>
			handler(request, response, () => response.writeHead(404).end()),
	};
};
