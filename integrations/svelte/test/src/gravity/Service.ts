import { BaseService } from '@digitak/gravity';
import type { Context } from './Context';

export class Service extends BaseService<Context> {
	get user() {
		return this.context.user;
	}
}
