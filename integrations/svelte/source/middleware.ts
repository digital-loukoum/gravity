import { GravityMiddleware } from "@digitak/gravity/types/GravityMiddleware"
import { normalizePath } from "@digitak/gravity/utilities/normalizePath"
import resolveApiRequest from "@digitak/gravity/utilities/resolveApiRequest"

/**
 * Add this middleware in '/hooks.ts' file
 */
export const gravity: GravityMiddleware = ({ services, apiPath = "/api" }) => {
	apiPath = normalizePath(apiPath)

	const handler = async ({ request, resolve }: any) => {
		const { rawBody, path, headers } = request
		if (apiPath == normalizePath(path)) {
			return resolveApiRequest(services, headers, rawBody)
		} else return resolve(request)
	}

	return handler
}
