import { GravityMiddleware } from "../types/GravityMiddleware"
import { normalizePath } from "../utilities/normalizePath"
import resolveApiRequest from "../utilities/resolveApiRequest"

export const gravity: GravityMiddleware = ({ services, apiPath = "/api" }) => {
	apiPath = normalizePath(apiPath)

	const handler = async ({ request, resolve }: any) => {
		const { rawBody, path, headers } = request
		console.log("Resolving request:", path)
		if (apiPath == normalizePath(path)) {
			return resolveApiRequest(services, headers, rawBody)
		} else return resolve(request)
	}

	return handler
}
