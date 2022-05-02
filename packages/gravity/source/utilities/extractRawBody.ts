import type { IncomingMessage } from "http";

/**
 * Extract the raw body from an incoming request
 */
export async function extractRawBody(
	request: IncomingMessage,
): Promise<Uint8Array> {
	const chunks: Array<Uint8Array> = [];
	for await (const chunk of request) chunks.push(chunk);
	return Buffer.concat(chunks);
}
