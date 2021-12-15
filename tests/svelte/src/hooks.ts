import { gravity } from '@digitak/gravity/library/middleware/svelte-kit';
import { services } from './services';

export const handle = gravity({ services });
