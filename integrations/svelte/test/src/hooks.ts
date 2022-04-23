import { gravity } from '@digitak/gravity-svelte';
import { services } from './gravity/services';
import type { Context } from './gravity/Context';
import schema from './gravity/schema.json';

console.log('schema', schema);

export const handle = gravity<Context>({
	services,
	schema,

	onRequestReceive: () => {
		return { user: 'admin' };
	},

	authorize: () => {
		// console.log('is Public?', isPublic(service, operation));
	}
});
