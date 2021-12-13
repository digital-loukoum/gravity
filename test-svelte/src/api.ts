import { useApi } from '@digitak/gravity';
import type { services } from './services';

export const api = useApi<typeof services>();
