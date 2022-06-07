import type { CallApiOptions } from "../api/defineApi.js";

export type FetchOptions = CallApiOptions & {
	cache?: boolean | "read" | "write";
	network?: boolean | "if-needed";
	persist?: boolean;
	interval?: number; // minimum fetch interval in milliseconds
};
