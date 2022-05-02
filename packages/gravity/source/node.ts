import type { IncomingMessage, ServerResponse } from "http";
import type { DefineHandlerOptions } from "./handler/DefineHandlerOptions.js";
import type { ServicesRecord } from "./services/ServicesRecord.js";
import { defineHandler as defineHandlerMiddleware } from "./middleware.js";
import type { GetContext } from "./services/GetContext.js";

/**
 * Default handler for node taht returns 404 if apiPath is not matched
 */
export const defineHandler = <Services extends ServicesRecord<any>>(
	options: DefineHandlerOptions<
		GetContext<Services>,
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
