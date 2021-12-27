import { bunker } from "@digitak/bunker";
import type { IncomingHttpHeaders } from "http";
import { BaseServiceConstructor } from "../services/BaseService";
import { GravityResponse } from "../types/GravityResponse";
import { decodeRawBody } from "./decodeRawBody";

export default async function resolveApiRequest(
	services: Record<string, BaseServiceConstructor>,
	headers: IncomingHttpHeaders,
	rawBody: Uint8Array,
	context: unknown,
): Promise<GravityResponse> {
	try {
		if (!rawBody) throw `Bad request: a body is expected`;

		const body = decodeRawBody(headers, rawBody);

		const serviceConstructor = services[body.service];
		if (!serviceConstructor) {
			throw `Bad request: the service '${body.service}' does not exist.`;
		}

		const service = new serviceConstructor(context);

		const operationName = body.operation as keyof typeof service;
		const operation = service?.[operationName] as unknown;

		if (!operation) {
			throw `Bad request: the operation '${body.operation}' does not exist in service '${body.service}'.`;
		} else if (typeof operation != "function") {
			throw `Bad request: the operation '${body.operation}' in service '${body.service}' is not a function.`;
		}

		const response = await operation.apply(service, body.properties);

		return {
			status: 200,
			headers: {
				"content-type": "x-bunker",
			},
			body: bunker(response),
		};
	} catch (error) {
		return {
			status: 500,
			headers: {},
			body: String(error),
		};
	}
}
