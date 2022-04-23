export type ApiStoreInterface = {
	refresh: () => void;
	poller?: NodeJS.Timer;
};
