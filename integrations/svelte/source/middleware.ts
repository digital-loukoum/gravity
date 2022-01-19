import type { GravityResponse } from "@digitak/gravity/types/GravityResponse";
import type {
	Handle,
	ServerRequest,
	ServerResponse,
} from "@sveltejs/kit/types/hooks";
import type { GravityMiddleware } from "@digitak/gravity/middleware/GravityMiddleware";
import { normalizePath } from "@digitak/gravity/middleware/normalizePath";
import { resolveApiError } from "@digitak/gravity/errors/resolveApiError";
import { resolveApiRequest } from "@digitak/gravity/middleware/resolveApiRequest";
import { apiMatchesUrl } from "@digitak/gravity/middleware/apiMatchesUrl";
import { logger } from "@digitak/gravity/logs/logger";

/**
 * Add this middleware in '/hooks.ts' file
 */
export const gravity: GravityMiddleware<ServerRequest, ServerResponse> = ({
	services,
	apiPath = "/api",
	verbose,
	onRequestReceive,
	onResponseSend,
	authorize,
}) => {
	apiPath = normalizePath(apiPath);
	logger.verbose = verbose ?? false;

	const handler: Handle = async ({ request, resolve }) => {
		const { url: rawUrl, rawBody, headers } = request;
		const url = rawUrl.pathname;
		if (!apiMatchesUrl(apiPath, url)) return await resolve(request);

		let response: GravityResponse;
		try {
			const context = await onRequestReceive?.(request)!;
			response = await resolveApiRequest({
				url: url.slice(apiPath.length),
				services,
				headers,
				rawBody,
				context,
				authorize,
			});
		} catch (error) {
			response = resolveApiError(error);
		}
		onResponseSend?.(response);
		return response;
	};

	return handler;
};
