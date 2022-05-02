import type { DefineHandlerOptions } from "@digitak/gravity/handler/DefineHandlerOptions";
import type { ServicesRecord } from "@digitak/gravity";
import type { GetContext } from "@digitak/gravity/services/GetContext";
import type { IncomingMessage, ServerResponse } from "http";
import { defineEventHandler } from "h3";
import { defineHandler as defineBaseHandler } from "@digitak/gravity/middleware";

/**
 * Nuxt request handler for Gravity services.
 */
export const defineHandler = <Services extends ServicesRecord<any>>(
	options: DefineHandlerOptions<
		GetContext<Services>,
		Services,
		IncomingMessage,
		ServerResponse
	>,
) => {
	const coreHandler = defineBaseHandler<Services>(options);
	const { handler } = coreHandler;

	return {
		handler: defineEventHandler((event) => {
			if ("__is_event__" in event) {
				return handler(event.req, event.res);
			}
		}),
	};
};
