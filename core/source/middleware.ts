import type { IncomingMessage, ServerResponse } from "http";
import { resolveApiError } from "./errors/resolveApiError";
import { GravityMiddleware } from "./types/GravityMiddleware";
import { extractRawBody } from "./utilities/extractRawBody";
import { normalizePath } from "./utilities/normalizePath";
import { resolveApiRequest } from "./utilities/resolveApiRequest";

export const gravity: GravityMiddleware = ({
	services,
	apiPath = "/api",
	onRequestReceive,
	onResponseSend,
	authorize,
}) => {
	apiPath = normalizePath(apiPath);

	return async (
		request: IncomingMessage,
		response: ServerResponse,
		next?: Function,
	) => {
		const url = request.url ?? "";
		if (!normalizePath(url).startsWith(apiPath)) return next?.();

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
