import type { IncomingMessage, ServerResponse } from "http";
import type { DefineHandlerOptions } from "./handler/DefineHandlerOptions.js";
import { extractRawBody } from "./utilities/extractRawBody.js";
import { resolveApiRequest } from "./handler/resolveApiRequest.js";
import { apiMatchesUrl } from "./utilities/apiMatchesUrl.js";
import { normalizeHandlerOptions } from "./handler/normalizeHandlerOptions.js";

export const defineHandler = <Context>(
	options: DefineHandlerOptions<Context, IncomingMessage, ServerResponse>,
) => {
	const { apiPath } = normalizeHandlerOptions(options);

	return async (
		request: IncomingMessage,
		response: ServerResponse,
		next?: Function,
	) => {
		const url = request.url ?? "";
		if (!apiMatchesUrl(apiPath, url)) return next?.();
		const rawBody = await extractRawBody(request);

		const { status, headers, body } = await resolveApiRequest<
			Context,
			IncomingMessage
		>({
			request,
			url: url.slice(apiPath.length),
			rawBody,
			allowedOrigins: options.allowedOrigins,
			services: options.services,
			schema: options.schema,
			headers: request.headers,
			authorize: options.authorize,
			onRequestReceive: options.onRequestReceive,
		});

		response.statusCode = status;

		for (const header in headers) {
			response.setHeader(header, headers[header]);
		}

		response = (await options.onResponseSend?.({ response })) ?? response;

		// we write the result
		response.write(body);
		response.end();
		return response;
	};
};
