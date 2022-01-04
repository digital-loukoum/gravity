import { SwrResponse } from "./_SwrResponse";

export const responseNeedsRefresh = (
	{ lastRefreshAt }: SwrResponse<unknown>,
	interval?: number,
) => !interval || !lastRefreshAt || lastRefreshAt + interval < Date.now();
