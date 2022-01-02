import { bunker } from "@digitak/bunker";
import { GravityResponse } from "../types/GravityResponse";
import { ServerError } from "./ServerError";
import { GravityUnknownError } from "./GravityUnknownError";
import { logger } from "../logs/logger";

export function resolveApiError(error: unknown): GravityResponse {
	if (error instanceof ServerError) {
		logger.warning(error.name, error.message, error.stack);
		const { name, message, status } = error;
		return {
			status,
			headers: { "content-type": "x-bunker" },
			body: bunker({ error: { name, message, status } }),
		};
	} else if (error instanceof Error) {
		// wild exception
		logger.error(error.name, error.message, error.stack);
		const { name, message } = error;
		const status = 500;
		return {
			status,
			headers: { "content-type": "x-bunker" },
			body: bunker({ error: { name, message, status } }),
		};
	} else if (typeof error == "string") return resolveApiError(new Error(error));
	else return resolveApiError(new GravityUnknownError(error));
}
