import { getSiteMap } from 'src/utilities/getSiteMap';

export const get = async () => ({
	body: await getSiteMap('documentation')
});
