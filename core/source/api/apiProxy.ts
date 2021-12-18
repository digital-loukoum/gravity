import { proxy } from "../utilities/proxy"

export function apiProxy<
	Handler extends (service: string, operation: string, properties: unknown[]) => unknown
>(handler: Handler) {
	return proxy(service =>
		proxy(
			operation =>
				(...properties: unknown[]) =>
					handler(service, operation, properties)
		)
	)
}

// {
// 	return async (...properties: unknown[]) => {
// 		console.log("isBrowser?", isBrowser())
// 		if (!isBrowser()) return undefined

// 		const headers = new Headers()
// 		headers.append("Content-Type", "x-bunker")
// 		const response = await fetch(apiPath, {
// 			method: "POST",
// 			headers,
// 			body: bunker({ service, operation, properties }),
// 		})
// 		console.log("response:", response)

// 		// TODO: should return an error object
// 		if (!response.ok) return undefined

// 		if (response.headers.get("Content-Type") == "x-bunker") {
// 			return debunker(new Uint8Array(await response.arrayBuffer()))
// 		}
// 		return response.json()
// 	}
