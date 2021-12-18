import { defineApi } from "./defineApi"
import { Api, UseApi } from "./Api"
import { apiProxy } from "./apiProxy"
import { getCacheKey } from "./getCacheKey"
import { SwrResponse } from "./SwrResponse"

export function defineApiWithSwr<Services extends Record<string, unknown>>({
	apiPath = "/api",
	swr,
}: {
	apiPath: string
	swr: {
		withKey: (key: string, promise: Promise<unknown>) => SwrResponse
		withoutKey: (promise: Promise<unknown>) => SwrResponse
	}
}): { api: Api<Services>; useApi: UseApi<Services> } {
	const api = defineApi<Services>(apiPath)
	const useApi = apiProxy(async (service, operation, properties) => () => {
		// @ts-ignore
		const promise = api[service][operation](properties)
		const key = getCacheKey(service, operation, properties)

		if (key) return swr.withKey(key, promise)
		else return swr.withoutKey(promise)
	}) as UseApi<Services>

	return { api, useApi }
}
