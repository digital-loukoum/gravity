import type { GravityMiddleware } from "@digitak/gravity/types/GravityMiddleware";
import type { GravityResponse } from "@digitak/gravity/types/GravityResponse";
import { normalizePath } from "@digitak/gravity/utilities/normalizePath";
import { resolveApiRequest } from "@digitak/gravity/utilities/resolveApiRequest";
import { resolveApiError } from "@digitak/gravity/errors/resolveApiError";

/**
 * Add this middleware in '/hooks.ts' file
 */
export const gravity: GravityMiddleware<GravityResponse> = ({
	services,
	apiPath = "/api",
	onRequestReceive,
	onResponseSend,
	authorize,
}) => {
	apiPath = normalizePath(apiPath);

	const handler = async ({ request, resolve }: any) => {
		const { rawBody, path, headers } = request;
		if (apiPath != normalizePath(path)) return await resolve(request);

		let response: GravityResponse;
		try {
			const context = await onRequestReceive?.(request)!;
			response = await resolveApiRequest({
				services,
				headers,
				rawBody,
				context,
				authorize,
			});
		} catch (error) {
			response = resolveApiError(error);
		}
		onResponseSend?.(response);
		return response;
	};

	return handler;
};
