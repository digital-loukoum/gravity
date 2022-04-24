import { defineHandler } from '@digitak/gravity-svelte/kit';
import { services } from './gravity/services';
import type { Context } from './gravity/Context';
import schema from './gravity/schema.json';

export const handle = defineHandler<Context>({
	services,
	schema,

	onRequestReceive: () => {
		return { user: 'admin' };
	},

	authorize: async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// console.log('is Public?', isPublic(service, operation));
	}
});
