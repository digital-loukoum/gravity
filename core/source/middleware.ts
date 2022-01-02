import type { IncomingMessage, ServerResponse } from "http";
import { GravityMiddleware } from "./types/GravityMiddleware";
import extractRawBody from "./utilities/extractRawBody";
import { normalizePath } from "./utilities/normalizePath";
import resolveApiRequest from "./utilities/resolveApiRequest";

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
		next: Function,
	) => {
		if (apiPath != normalizePath(request.url ?? "")) return next?.();

		// we get the context from the request
		// (request transformations can also be applied here)
		const { context } = (await onRequestReceive?.(request)) || {
			context: undefined,
		};

		const rawBody = await extractRawBody(request);

		const { status, headers, body } = await resolveApiRequest({
			services,
			headers: request.headers,
			rawBody,
			context,
			authorize,
		});
		response.statusCode = status;
		for (const header in headers) response.setHeader(header, headers[header]);

		// we write the result
		response.write(body);
		await onResponseSend?.(response);
		response.end();
	};
};
