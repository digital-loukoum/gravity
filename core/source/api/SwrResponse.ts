export type SwrResponse<Data = unknown> = {
	data: Data
	error: Error | null
	isLoading: boolean
	promise: Promise<Data>
}
