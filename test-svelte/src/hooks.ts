import { gravity } from '../../../../source/middleware/svelte-kit';
import { services } from '../../../services';

export const handle = gravity({ services });
