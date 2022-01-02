import { defineGuard } from '@digitak/gravity';
import type { Context } from '../Context';

export const Admin = defineGuard<Context>((context) => {
	console.log('Checking guard...');
	if (context.user != 'admin') throw `Forbidden access: you are not admin`;
});
