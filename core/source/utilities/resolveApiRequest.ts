import { bunker } from "@digitak/bunker";
import type { IncomingHttpHeaders } from "http";
import { GravityError } from "../errors/GravityError";
import { baseServiceProperties } from "../services/BaseService";
import { BaseServiceConstructor } from "../services/BaseServiceConstructor";
import type { GravityAuthorizeFunction } from "../types/GravityAuthorizeFunction";
import { GravityResponse } from "../types/GravityResponse";
import { decodeRawBody } from "./decodeRawBody";

export async function resolveApiRequest<Context>({
	services,
	headers,
	rawBody,
	context,
	authorize,
}: {
	services: Record<string, BaseServiceConstructor>;
	headers: IncomingHttpHeaders;
	rawBody: Uint8Array;
	context: Context;
	authorize: GravityAuthorizeFunction<Context> | undefined;
}): Promise<GravityResponse> {
	if (!rawBody) {
		throw new GravityError("gravity/body-missing", { status: 400 });
	}

	const body = decodeRawBody(headers, rawBody);

	const serviceConstructor = services[body.service];
	if (!serviceConstructor) {
		throw new GravityError("gravity/service-inexistant", {
			message: `The service '${body.service}' does not exist.`,
			status: 404,
		});
	}

	const service = new serviceConstructor(context);

	const operationName = body.operation as keyof typeof service;
	const operation = service?.[operationName] as unknown;

	if (
		!operation ||
		operationName in baseServiceProperties() ||
		typeof operation != "function"
	) {
		throw new GravityError("gravity/operation-inexistant", {
			message: `The operation '${body.operation}' does not exist in service '${body.service}'.`,
			status: 404,
		});
	}

	await authorize?.({
		context,
		service: serviceConstructor,
		operation: operationName,
	});

	const response = await operation.apply(service, body.properties);

	return {
		status: 200,
		headers: {
			"content-type": "x-bunker",
		},
		body: bunker(response),
	};
}
