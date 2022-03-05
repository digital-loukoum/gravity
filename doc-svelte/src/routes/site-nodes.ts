import { getSiteNodes } from 'src/utilities/getSiteNodes';

export const get = async () => ({
	body: getSiteNodes()
});
