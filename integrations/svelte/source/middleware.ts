import type { GravityResponse } from "@digitak/gravity/types/GravityResponse";
import type { Handle, RequestEvent } from "@sveltejs/kit/types/hooks";
import type { GravityMiddleware } from "@digitak/gravity/middleware/GravityMiddleware";
import { normalizePath } from "@digitak/gravity/middleware/normalizePath";
import { resolveApiError } from "@digitak/gravity/errors/resolveApiError";
import { resolveApiRequest } from "@digitak/gravity/middleware/resolveApiRequest";
import { apiMatchesUrl } from "@digitak/gravity/middleware/apiMatchesUrl";
import { logger } from "@digitak/gravity/logs/logger";
import { headersToIncomingHttpHeaders } from "@digitak/gravity/middleware/headersToIncomingHttpHeaders";
import { getAllowedOrigin } from "@digitak/gravity/middleware/getAllowedOrigin";

/**
 * Add this middleware in '/hooks.ts' file
 */
export const gravity: GravityMiddleware<RequestEvent, Response> = ({
	services,
	apiPath = "/api",
	verbose,
	allowedOrigins,
	onRequestReceive,
	onResponseSend,
	authorize,
}) => {
	apiPath = normalizePath(apiPath);
	logger.verbose = verbose ?? false;

	const handler: Handle = async ({ event, resolve }) => {
		const { url, request } = event;
		const { headers } = request;
		const { pathname } = url;
		if (!apiMatchesUrl(apiPath, pathname)) return await resolve(event);

		const rawBody = new Uint8Array(await request.arrayBuffer());
		const allowedOrigin = getAllowedOrigin(
			request.headers.get("origin"),
			allowedOrigins,
		);
		let resolved: GravityResponse;

		try {
			const context = await onRequestReceive?.(event)!;
			resolved = await resolveApiRequest({
				url: pathname.slice(apiPath.length),
				services,
				headers: headersToIncomingHttpHeaders(headers),
				rawBody,
				context,
				authorize,
			});
		} catch (error) {
			resolved = resolveApiError(error);
		}

		const resolvedHeaders = resolved.headers;
		resolvedHeaders["Access-Control-Allow-Headers"] = "*";
		if (allowedOrigin != null) {
			resolvedHeaders["Access-Control-Allow-Origin"] = allowedOrigin;
		}

		const response: Response = new Response(resolved.body, {
			headers: resolvedHeaders,
			status: resolved.status,
		});

		await onResponseSend?.(response);
		return response;
	};

	return handler;
};
