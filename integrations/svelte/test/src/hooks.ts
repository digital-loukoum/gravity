import { gravity } from '@digitak/gravity-svelte';
import { services } from './services';
import { isPublic } from './services/decorators/Public';

export const handle = gravity({
	services,
	authorize: ({ service, operation, context }) => {
		console.log('is Public?', isPublic(service, operation));
	}
});
