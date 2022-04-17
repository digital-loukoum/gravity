import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import type { GravityResponse } from "./GravityResponse.js";
import type { Type } from "typezer";
import type { Authorize } from "./Authorize.js";
import type { OnRequestReceive } from "./OnRequestReceive.js";
import type { IncomingHttpHeaders } from "http";
import { bunker } from "@digitak/bunker";
import { gravityError, isGravityError } from "../errors/GravityError.js";
import { decodeParameters } from "../utilities/decodeParameters.js";
import { decodeUrl } from "../utilities/decodeUrl.js";
import { validateSignature } from "typezer/validate";
import { resolvePath } from "./resolvePath.js";
import { getAllowedOrigin } from "../utilities/getAllowedOrigin.js";
import { logger } from "../logs/logger.js";

export type ResolveApiRequestOptions<Context, Request> = {
	request: Request;
	url: string;
	services: Record<string, BaseServiceConstructor>;
	schema: Record<string, Record<string, Type>>;
	headers: IncomingHttpHeaders;
	rawBody: Uint8Array | null | undefined;
	allowedOrigins: string[] | undefined;
	authorize: Authorize<Context> | undefined;
	onRequestReceive: OnRequestReceive<Context, Request> | undefined;
};

export async function resolveApiRequest<Context, Request>(
	options: ResolveApiRequestOptions<Context, Request>,
): Promise<GravityResponse> {
	const allowedOrigin = getAllowedOrigin(
		options.headers.origin,
		options.allowedOrigins,
	);
	const context = await options.onRequestReceive?.(options.request)!;

	const encoding =
		options.headers["content-type"] == "application/bunker" ? "bunker" : "json";
	const [serviceName, ...path] = decodeUrl(options.url);

	let status = 200;
	let resolved: unknown;
	let { headers } = options;

	try {
		if (!serviceName) {
			throw gravityError({
				message: "Service missing",
				serviceName,
				status: 400,
			});
		}

		if (!path.length) {
			throw gravityError({
				message: "Target missing",
				serviceName,
				status: 400,
			});
		}

		const serviceConstructor = options.services[serviceName];
		if (!serviceConstructor) {
			throw gravityError({
				message: "Service inexistant",
				serviceName,
				status: 404,
			});
		}

		// we authorize the call
		await options.authorize?.({
			context,
			service: serviceConstructor,
			path,
		});

		const service = new serviceConstructor(context);
		const operation = resolvePath(serviceName, service, path);

		if (typeof operation == "function") {
			const parameters = decodeParameters(options.headers, options.rawBody);
			const { errors } = validateSignature(
				options.schema[serviceName],
				path,
				parameters,
			);
			if (errors?.length) {
				throw gravityError({
					message: "Bad parameters",
					errors,
					status: 400,
				});
			}
			resolved = await operation.apply(service, parameters);
		} else resolved = await operation;
	} catch (error) {
		if (error instanceof Error) {
			const log = isGravityError(error) ? logger.warning : logger.error;
			log(error.name, error.message, error.stack);
			status = (isGravityError(error) ? error.status : undefined) ?? 500;
			const { name, message } = error;
			resolved = { ...error, name, message };
		} else {
			const errorStatus = (error as any)?.status;
			status = typeof errorStatus == "number" ? errorStatus : 500;
			resolved = {
				name: "UnknownError",
				detail: error,
			};
		}
	}

	headers["content-type"] = `application/${encoding}`;
	headers["access-control-allow-headers"] = "*";
	if (allowedOrigin != null) {
		headers["access-control-allow-origin"] = allowedOrigin;
	}

	return {
		status,
		headers,
		body: encoding == "bunker" ? bunker(resolved) : JSON.stringify(resolved),
	};
}
