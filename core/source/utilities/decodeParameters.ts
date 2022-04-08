import { debunker } from "@digitak/bunker";
import type { IncomingHttpHeaders } from "http";

type RawBodyDecoder = (rawBody: Uint8Array) => unknown;

const jsonDecoder: RawBodyDecoder = (rawBody) =>
	JSON.parse(new TextDecoder().decode(rawBody));

const bunkerDecoder: RawBodyDecoder = debunker;

/**
 * Transform a raw body into a Gravity body
 */
export const decodeParameters = (
	headers: IncomingHttpHeaders,
	rawBody: Uint8Array | null | undefined,
): unknown[] => {
	if (!rawBody?.byteLength) return [];

	const decode =
		headers["content-type"] == "application/bunker"
			? bunkerDecoder
			: jsonDecoder;

	let parameters: any = decode(rawBody) ?? [];
	if (!Array.isArray(parameters)) parameters = [parameters];
	return parameters;
};
