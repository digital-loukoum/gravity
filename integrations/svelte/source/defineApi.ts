import { defineApi as defaultDefineApi } from "@digitak/gravity/api/defineApi"
import { apiProxy } from "@digitak/gravity/api/apiProxy"
import { getCacheKey } from "@digitak/gravity/api/getCacheKey"
import { isBrowser } from "@digitak/gravity/utilities/isBrowser"
import { swr, useSWR } from "sswr"
import { writable } from "svelte/store"
import { ReadonlySwrResponse, swrResponse, SwrResponse } from "./SwrResponse"
import { onMount } from "svelte/internal"
import { cache } from "./cache"

type DefineApi<Service> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (
				...args: Parameters<Service[Key]>
		  ) => SwrResponse<Awaited<ReturnType<Service[Key]>>>
		: never
}

type UseApi<Services> = { [Key in keyof Services]: DefineApi<Services[Key]> }

export function defineApi<Services extends Record<string, unknown>>(apiPath = "/api") {
	const api = defaultDefineApi<Services>(apiPath)

	const useApi = () =>
		apiProxy((service, operation, properties) => {
			if (!isBrowser()) return swrResponse<unknown>()

			// @ts-ignore
			const fetcher: () => Promise<unknown> = () => api[service][operation](properties)
			const key = getCacheKey(service, operation, properties)
			let response: SwrResponse<unknown>

			if (key) {
				const cached = cache.get(key)
				if (cached) response = cached
				else {
					response = swrResponse<unknown>()
					cache.set(key, response)
				}
			} else {
				response = swrResponse<unknown>()
			}

			fetcher() // TODO: error should be in 'then'
				.then(data => {
					console.log("Received", response)
					response.update(response => {
						response.data = data
						response.isLoading = false
						return response
					})
				})
			return response
		}) as UseApi<Services>

	return { api, useApi }
}
