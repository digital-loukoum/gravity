import type { IncomingMessage, ServerResponse } from "http";
import { resolveApiError } from "./errors/resolveApiError";
import { logger } from "./logs/logger";
import { GravityMiddleware } from "./middleware/GravityMiddleware";
import { extractRawBody } from "./middleware/extractRawBody";
import { normalizePath } from "./middleware/normalizePath";
import { resolveApiRequest } from "./middleware/resolveApiRequest";
import { apiMatchesUrl } from "./middleware/apiMatchesUrl";

export const gravity: GravityMiddleware = ({
	services,
	apiPath = "/api",
	verbose,
	onRequestReceive,
	onResponseSend,
	authorize,
}) => {
	apiPath = normalizePath(apiPath);
	logger.verbose = verbose ?? false;

	return async (
		request: IncomingMessage,
		response: ServerResponse,
		next?: Function,
	) => {
		const url = request.url ?? "";
		if (!apiMatchesUrl(apiPath, url)) return next?.();

		let status: number;
		let headers: Record<string, any>;
		let body: string | Uint8Array;

		try {
			// we get the context from the request
			// (request transformations can also be applied here)
			const context = await onRequestReceive?.(request)!;
			const rawBody = await extractRawBody(request);

			({ status, headers, body } = await resolveApiRequest({
				url: url.slice(apiPath.length),
				services,
				headers: request.headers,
				rawBody,
				context,
				authorize,
			}));
		} catch (error) {
			({ status, headers, body } = resolveApiError(error));
		}

		response.statusCode = status;
		for (const header in headers) response.setHeader(header, headers[header]);

		// we write the result
		response.write(body);
		await onResponseSend?.(response);
		response.end();
		return response;
	};
};
