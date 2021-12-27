import type { GravityMiddleware } from "@digitak/gravity/types/GravityMiddleware";
import type { GravityResponse } from "@digitak/gravity/types/GravityResponse";
import { normalizePath } from "@digitak/gravity/utilities/normalizePath";
import resolveApiRequest from "@digitak/gravity/utilities/resolveApiRequest";

/**
 * Add this middleware in '/hooks.ts' file
 */
export const gravity: GravityMiddleware<GravityResponse> = ({
	services,
	apiPath = "/api",
	onRequestReceive,
	onResponseSend,
}) => {
	apiPath = normalizePath(apiPath);

	const handler = async ({ request, resolve }: any) => {
		const { rawBody, path, headers } = request;
		if (apiPath == normalizePath(path)) {
			const { context } = (await onRequestReceive?.(request)) || {
				context: undefined,
			};
			const response = await resolveApiRequest(
				services,
				headers,
				rawBody,
				context,
			);
			onResponseSend?.(response);
			return response;
		} else return await resolve(request);
	};

	return handler;
};
