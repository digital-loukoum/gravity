import { SwrResponse } from "./swrResponse";

export const responseNeedsRefresh = (
	{ lastRefreshAt }: SwrResponse<unknown>,
	interval?: number,
) => !interval || !lastRefreshAt || lastRefreshAt + interval < Date.now();
