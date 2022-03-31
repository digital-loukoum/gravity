import { gravity } from '@digitak/gravity-svelte';
import { services } from './gravity/services';
import type { Context } from './gravity/Context';
import { schema } from '@digitak/gravity/schema';

console.log('schema', schema);

export const handle = gravity<Context>({
	services,
	schema,

	onRequestReceive: (request) => {
		return { user: 'admin' };
	},

	authorize: ({ service, context }) => {
		// console.log('is Public?', isPublic(service, operation));
	}
});
