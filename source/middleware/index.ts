import type { IncomingMessage, ServerResponse } from "http"
import { GravityMiddleware } from "../types/GravityMiddleware"
import extractRawBody from "../utilities/extractRawBody"
import { normalizePath } from "../utilities/normalizePath"
import resolveApiRequest from "../utilities/resolveApiRequest"

export const gravity: GravityMiddleware = ({ services, apiPath = "/api" }) => {
	apiPath = normalizePath(apiPath)

	return async (request: IncomingMessage, response: ServerResponse, next: Function) => {
		if (apiPath != normalizePath(request.url ?? "")) return next()

		const rawBody = await extractRawBody(request)
		const { status, headers, body } = await resolveApiRequest(
			services,
			request.headers,
			rawBody
		)
		response.statusCode = status
		for (const header in headers) {
			response.setHeader(header, headers[header])
		}
		response.end(body)
	}
}
