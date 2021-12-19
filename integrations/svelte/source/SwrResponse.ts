import { writable, Writable, derived, Readable, get } from "svelte/store"

export type ReadonlySwrResponse<Data> = Readable<{
	data: Data | undefined
	error?: Error
	isLoading: boolean
}>

export const swrResponse = <Data>(): SwrResponse<Data> =>
	writable({
		data: <Data | undefined>undefined,
		error: <Error | undefined>undefined,
		isLoading: false,
	})

export type SwrResponse<Data> = Writable<{
	data: Data | undefined
	error: Error | undefined
	isLoading: boolean
}>
