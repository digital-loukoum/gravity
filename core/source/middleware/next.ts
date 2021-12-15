import type { IncomingMessage, ServerResponse } from "http"
import { GravityMiddleware } from "../types/GravityMiddleware"
import extractRawBody from "../utilities/extractRawBody"
import resolveApiRequest from "../utilities/resolveApiRequest"

/**
 * Add this middleware in '/pages/api/index.ts' file
 */
export const gravity: GravityMiddleware = ({ services }) => {
	return async (request: IncomingMessage, response: ServerResponse) => {
		const rawBody = await extractRawBody(request)
		console.log("rawBody", rawBody)
		const { status, headers, body } = await resolveApiRequest(
			services,
			request.headers,
			rawBody
		)
		console.log("Resolved api request!")
		response.statusCode = status
		for (const header in headers) {
			response.setHeader(header, headers[header])
		}
		response.end(body)
	}
}
