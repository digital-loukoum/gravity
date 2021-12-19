import type { IncomingMessage, ServerResponse } from "http"
import { GravityMiddleware } from "@digitak/gravity/types/GravityMiddleware"
import extractRawBody from "@digitak/gravity/utilities/extractRawBody"
import resolveApiRequest from "@digitak/gravity/utilities/resolveApiRequest"

/**
 * Add this middleware in '/pages/api/index.ts' file
 */
export const gravity: GravityMiddleware = ({ services }) => {
	return async (request: IncomingMessage, response: ServerResponse) => {
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
