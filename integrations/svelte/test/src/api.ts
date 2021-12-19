import { defineApi } from '@digitak/gravity-svelte/defineApi';
import type { services } from './services';
console.log('defineApi', defineApi);
export const { api, useApi } = defineApi<typeof services>();
