import { bunker, debunker } from "@digitak/bunker"
import error from "./utilities/error"
import { isBrowser } from "./utilities/isBrowser"
import { proxy } from "./utilities/proxy"

type Awaited<Type> = Type extends Promise<infer Subtype>
	? Promise<Subtype>
	: Promise<Type>

type ServiceOperations<Service> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (...args: Parameters<Service[Key]>) => Awaited<ReturnType<Service[Key]>>
		: never
}

type Api<Services> = { [Key in keyof Services]: ServiceOperations<Services[Key]> }

export const defineApi = <Services extends Record<string, unknown>>(
	apiPath = "/api"
): Api<Services> => {
	return proxy(service => {
		return proxy(operation => {
			return async (...properties: unknown[]) => {
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
				if (!response.ok) return response.statusText
				return debunker(new Uint8Array(await response.arrayBuffer()))
			}
		})
	})
}
