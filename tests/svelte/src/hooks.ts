import { gravity } from '@digitak/gravity/middleware/svelte-kit';
import { services } from './services';

export const handle = gravity({ services });
