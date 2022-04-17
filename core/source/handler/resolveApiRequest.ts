import { validateSignature } from "typezer/validate";
import { findTargetInSchema } from "typezer/types/Type/findPathTarget";
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
	let headers: IncomingHttpHeaders = {};
	let body: string | Uint8Array;

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

		console.log("path", serviceName, path);
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
		console.log("target", target);
		console.log("rawBody", options.rawBody);

		if (typeof target == "function") {
			const parameters = decodeParameters(options.headers, options.rawBody);
			console.log("validation", options.schema[serviceName], path);
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
		} else resolved = await target;
		console.log("No errors happened during request");
	} catch (error) {
		console.log("An error happened during request");
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

	if (encoding == "bunker") {
		body = bunker(resolved);
		headers["content-length"] = String(body.length);
	} else {
		body = JSON.stringify(resolved);
		headers["content-length"] = String(new TextEncoder().encode(body).length);
	}
	console.log("resolved", resolved, typeof resolved);
	console.log("body", body);

	return {
		status,
		headers,
		body,
	};
}
