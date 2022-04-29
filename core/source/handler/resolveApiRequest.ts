import { validateSignature } from "typezer/validate";
import { findTargetInSchema } from "typezer/types/Type/findPathTarget";
import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import type { GravityResponse } from "./GravityResponse.js";
import type { Type } from "typezer";
import type { Authorize } from "./Authorize.js";
import type { OnRequestReceive } from "./OnRequestReceive.js";
import type {
	IncomingHttpHeaders,
	IncomingMessage,
	ServerResponse,
} from "http";
import { bunker } from "@digitak/bunker";
import { gravityError, isGravityError } from "../errors/GravityError.js";
import { decodeParameters } from "../utilities/decodeParameters.js";
import { decodeUrl } from "../utilities/decodeUrl.js";
import { resolvePath } from "./resolvePath.js";
import { getAllowedOrigin } from "../utilities/getAllowedOrigin.js";
import { logger } from "../logs/logger.js";
import { parseCookies } from "../cookie/parseCookies.js";
import type { OnResponseSend } from "./OnResponseSend.js";

export type ResolveApiRequestOptions<Context, Request, Response> = {
	request: Request;
	method: string | undefined;
	url: string;
	services: Record<string, BaseServiceConstructor>;
	schema: Record<string, Record<string, Type>>;
	headers: IncomingHttpHeaders;
	rawBody: Uint8Array | null | undefined;
	allowedOrigins: string[] | undefined;
	authorize: Authorize<Context> | undefined;
	onRequestReceive: OnRequestReceive<Context, Request> | undefined;
	onResponseSend: OnResponseSend<Context, Response> | undefined;
	createResponse: (options: GravityResponse) => Response;
};

export async function resolveApiRequest<Context, Request, Response>(
	options: ResolveApiRequestOptions<Context, Request, Response>,
): Promise<Response> {
	const encoding =
		options.headers["content-type"] == "application/bunker" ? "bunker" : "json";
	const allowedOrigin = getAllowedOrigin(
		options.headers.origin,
		options.allowedOrigins,
	);

	let status = 200;
	let resolved: unknown;
	let headers: IncomingHttpHeaders = {};
	let body: string | Uint8Array = "";

	// setting response headers
	headers["content-type"] = `application/${encoding}`;
	headers["access-control-allow-headers"] = "*";
	if (allowedOrigin != null) {
		headers["access-control-allow-origin"] = allowedOrigin;
	}

	// if case of an "OPTIONS" request, we just return the headers
	// so that the browser can check if the POST request is
	// allowed or not
	if (options.method == "OPTIONS") {
		return options.createResponse({ status, headers, body });
	}

	const context = await options.onRequestReceive?.({
		request: options.request,
		cookies: parseCookies(options.headers.cookie ?? ""),
	})!;

	const [serviceName, ...path] = decodeUrl(options.url);

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
		if (!options.schema[serviceName]) {
			throw gravityError({
				message: "Schema is not in sync with services",
				status: 500,
			});
		}

		// we authorize the call
		await options.authorize?.({
			context,
			service: serviceConstructor,
			path,
		});

		const service = new serviceConstructor(context);

		// we check the path exists in schema
		const targetType = findTargetInSchema(options.schema[serviceName], path);
		if (!targetType) {
			throw gravityError({
				message: "Target inexistant",
				serviceName,
				target: path.join("/"),
				status: 404,
			});
		}
		// then we retrieve the target
		const target = resolvePath(serviceName, service, path);

		if (typeof target == "function") {
			const parameters = decodeParameters(options.headers, options.rawBody);
			let errors: Array<string> | undefined;

			try {
				({ errors } = validateSignature(
					options.schema[serviceName],
					path,
					parameters,
				));
			} catch (error) {
				throw gravityError({
					message: "Target inexistant",
					serviceName,
					target: path.join("/"),
					status: 404,
				});
			}
			if (errors?.length) {
				throw gravityError({
					message: "Bad parameters",
					errors,
					status: 400,
				});
			}
			resolved = await target.apply(service, parameters);
		} else {
			resolved = await target;
		}
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

	if (encoding == "bunker") {
		body = bunker(resolved);
		headers["content-length"] = String(body.length);
	} else {
		body = JSON.stringify(resolved);
		headers["content-length"] = String(new TextEncoder().encode(body).length);
	}

	let response = options.createResponse({ status, headers, body });
	return (await options.onResponseSend?.({ context, response })) ?? response;
}
