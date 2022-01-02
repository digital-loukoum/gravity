import { GravityBody } from "../types/GravityBody";
import { debunker } from "@digitak/bunker";
import type { IncomingHttpHeaders } from "http";
import { GravityError } from "../errors/GravityError";

type RawBodyDecoder = (rawBody: Uint8Array) => unknown;

const jsonDecoder: RawBodyDecoder = (rawBody) =>
	JSON.parse(new TextDecoder().decode(rawBody));

const bunkerDecoder: RawBodyDecoder = debunker;

/**
 * Transform a raw body into a Gravity body
 */
export const decodeRawBody = (
	headers: IncomingHttpHeaders,
	rawBody: Uint8Array,
): GravityBody => {
	const decode =
		headers["content-type"] == "x-bunker" ? bunkerDecoder : jsonDecoder;

	const body = decode(rawBody) as any;

	if (!body || typeof body != "object")
		throw new GravityError("gravity/body-missing", { status: 400 });
	if (!body.service)
		throw new GravityError("gravity/service-missing", { status: 400 });
	if (typeof body.service != "string")
		throw new GravityError("gravity/service-name-should-be-a-string", {
			message: `'${body.service}' is not a valid service name`,
			status: 400,
		});
	if (!body.operation)
		throw new GravityError("gravity/operation-missing", { status: 400 });
	if (typeof body.operation != "string")
		throw new GravityError("gravity/operation-name-should-be-a-string", {
			message: `'${body.operation}' is not a valid operation name`,
			status: 400,
		});

	if (!body.properties) body.properties = [];
	else if (!Array.isArray(body.properties)) body.properties = [body.properties];

	return body;
};
