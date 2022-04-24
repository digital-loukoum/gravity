export type FetchOptions = {
	cache?: boolean | "read" | "write";
	network?: boolean | "if-needed";
	interval?: number; // minimum fetch interval in milliseconds
};
