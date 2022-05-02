import type { ApiResponse } from "./ApiResponse.js";

export type OnResponseReceive = (
	options: {
		response: Response;
	} & ApiResponse,
) => unknown;
