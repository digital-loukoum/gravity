export type SwrInterface = {
	refresh: () => void;
	lastRefreshAt?: number;
	poller?: NodeJS.Timer;
};
