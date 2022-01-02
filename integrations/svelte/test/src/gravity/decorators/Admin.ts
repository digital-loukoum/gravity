import { defineGuard } from '@digitak/gravity';
import type { Service } from '../Service';

export const Admin = defineGuard<Service>(({ context }) => {
	if (context.user != 'admin') throw `Forbidden access: you are not admin`;
});
