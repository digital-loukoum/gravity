import type { DefineHandlerOptions } from "@digitak/gravity/handler/DefineHandlerOptions";
import { defineHandler as defineBaseHandler } from "@digitak/gravity/middleware";
import { defineEventHandler } from "h3";
import type { IncomingMessage, ServerResponse } from "http";

/**
 * Nuxt request handler for Gravity services.
 */
export const defineHandler = <Context>(
	options: DefineHandlerOptions<Context, IncomingMessage, ServerResponse>,
) => {
	const handler = defineBaseHandler<Context>(options);

	return defineEventHandler((event) => {
		if ("__is_event__" in event) {
			return handler(event.req, event.res);
		}
	});
};
