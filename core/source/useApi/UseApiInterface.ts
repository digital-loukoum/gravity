export type UseApiInterface = {
	refresh: () => void;
	poller?: NodeJS.Timer;
};
