import { defineApi } from '@digitak/gravity-svelte/defineApi';
import type { services } from './services';

export const { api, apiStore } = defineApi<typeof services>({});
