export type ApiResponse<Data = unknown> = {
	data: Data;
	errors: Array<Error>;
};
