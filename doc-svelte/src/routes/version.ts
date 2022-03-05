import { getVersion } from 'src/utilities/getVersion';

export const get = async () => ({
	body: getVersion()
});
