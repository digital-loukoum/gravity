import { defineGuard } from '@digitak/gravity';
import type { Service } from '../Service';
import { ServerError } from '@digitak/gravity/errors/ServerError';

export const Admin = defineGuard<Service>(({ context }) => {
	if (context.user != 'admin')
		throw new ServerError(`Forbidden access`, { message: 'You are not admin' });
});
