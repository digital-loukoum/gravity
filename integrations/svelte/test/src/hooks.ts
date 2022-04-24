import { defineHandler } from '@digitak/gravity-svelte/kit';
import { services } from './gravity/services';
import type { Context } from './gravity/Context';
import schema from './gravity/schema.json';
import { setCookies } from '@digitak/gravity/cookie.js';

export const handle = defineHandler<Context>({
	services,
	schema,

	onRequestReceive: ({ cookies }) => {
		console.log('Received cookies:', cookies);
		return { user: 'admin' };
	},

	onResponseSend: ({ response }) => {
		setCookies(response, {
			user: 'admin',
			randomCookie: {
				value: "I'm a random cookie",
				maxAge: 1000 * 60 * 60 * 24 * 365,
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: true
			}
		});
		return response;
	},

	authorize: async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// console.log('is Public?', isPublic(service, operation));
	}
});
