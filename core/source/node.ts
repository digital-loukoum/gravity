import { IncomingMessage, ServerResponse } from "http";
import { gravity as defaultMiddleware } from "./middleware";
import { GravityMiddleware } from "./types/GravityMiddleware";

/**
 * Default handler for node taht returns 404 if apiPath is not matched
 */
export const gravity: GravityMiddleware = (options) => {
	const handler = defaultMiddleware(options);
	return async (request: IncomingMessage, response: ServerResponse) => {
		handler(request, response, () => response.writeHead(404).end());
	};
};
