import type { IncomingHttpHeaders } from "http";

export function parseHeaders(headers: Headers): IncomingHttpHeaders {
	const result: IncomingHttpHeaders = {};
	headers.forEach((value, key) => {
		result[key] = value;
	});
	return result;
}
