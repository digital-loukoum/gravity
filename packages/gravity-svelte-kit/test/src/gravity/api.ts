import { defineApi } from '../../../source/defineApi.js';
import type { services } from './services';

export const { api, store, useStore } = defineApi<typeof services>({
	apiPath: '/api',
	persist: true,
	cache: false,
	network: 'if-needed'
});
