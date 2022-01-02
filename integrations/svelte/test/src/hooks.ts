import { gravity } from '@digitak/gravity-svelte';
import { services } from './gravity/services';
import type { Context } from './gravity/Context';
import { isPublic } from './gravity/decorators/Public';

export const handle = gravity<Context>({
	services,

	onRequestReceive: (request) => {
		return { user: 'admin' };
	},

	authorize: ({ service, operation, context }) => {
		// console.log('is Public?', isPublic(service, operation));
	}
});
