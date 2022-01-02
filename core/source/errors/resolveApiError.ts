import { bunker } from "@digitak/bunker";
import { GravityResponse } from "../types/GravityResponse";
import { ServerError } from "./ServerError";
import { GravityUnknownError } from "./GravityUnknownError";
import { logger } from "../logs/logger";

export function resolveApiError(error: unknown): GravityResponse {
	if (error instanceof ServerError) {
		logger.error(error.name, error.message, error.stack);
		return {
			status: error.status,
			headers: { "content-type": "x-bunker" },
			body: bunker({ error }),
		};
	} else if (error instanceof Error) {
		// wild exception
		return resolveApiError(
			new ServerError(error.name, { message: error.message, status: 500 }),
		);
	} else if (typeof error == "string") return resolveApiError(new Error(error));
	else return resolveApiError(new GravityUnknownError(error));
}
