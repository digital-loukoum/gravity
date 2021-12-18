import { defineApiWithSwr } from "@digitak/gravity"
import useSWR from "swr"
import { useState } from "react"

export function defineApi<Services extends Record<string, unknown>>(apiPath = "/api") {
	return defineApiWithSwr<Services>({
		apiPath,
		swr: {
			withKey: (key, promise) => {
				const { data } = useSWR(key, () => promise)
				const [error, setError] = useState<null | Error>(null)
				const [isLoading, setIsLoading] = useState(true)
				promise.catch(error => setError(error)).finally(() => setIsLoading(false))
				return { data, error, isLoading, promise }
			},
			withoutKey: promise => {
				const [data, setData] = useState<unknown>(undefined)
				const [isLoading, setIsLoading] = useState(true)
				const [error, setError] = useState<null | Error>(null)
				promise
					.then(data => setData(data))
					.catch(error => setError(error))
					.finally(() => setIsLoading(false))
				return { data, error, isLoading, promise }
			},
		},
	})
}
