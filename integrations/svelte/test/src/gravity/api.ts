import { defineApi } from '@digitak/gravity-svelte/defineApi';
import type { services } from './services';

export const { api, useApi } = defineApi<typeof services>({
	network: 'if-needed'
});
