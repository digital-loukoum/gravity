import { bunker, debunker } from "@digitak/bunker"
import { isBrowser } from "../utilities/isBrowser"
import { Api } from "./Api"
import { apiProxy } from "./apiProxy"

export function defineApi<Services extends Record<string, unknown>>(
	apiPath = "/api"
): Api<Services> {
	return apiProxy(async (service, operation, properties) => {
		console.log("isBrowser?", isBrowser())
		if (!isBrowser()) return undefined

		const headers = new Headers()
		headers.append("Content-Type", "x-bunker")
		const response = await fetch(apiPath, {
			method: "POST",
			headers,
			body: bunker({ service, operation, properties }),
		})
		console.log("response:", response)

		// TODO: should return an error object
		if (!response.ok) return undefined

		if (response.headers.get("Content-Type") == "x-bunker") {
			return debunker(new Uint8Array(await response.arrayBuffer()))
		}
		return response.json()
	}) as Api<Services>
}
