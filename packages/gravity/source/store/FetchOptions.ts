import type { CallApiOptions } from "../api/defineApi.js";
import type { Identify } from "../identifiables/Identify.js";

export type FetchOptions = CallApiOptions & {
	cache?: boolean | "read" | "write";
	network?: boolean | "if-needed";
	persist?: boolean;
	interval?: number; // minimum fetch interval in milliseconds

	// function used to identify objects received from the api
	identify?: Identify | boolean;
};
