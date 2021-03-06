import { Public } from '../guards/Public';
import { Service } from '../Service';
import { cat } from './cat';
import { useService } from '@digitak/gravity/services/useService';

export class dog extends Service {
	name = 'Some dog name';

	// @useService(cat) cat!: cat

	// get cat() { return this.useService(cat) }

	@useService(cat)
	protected cat!: cat;

	@Public
	async woof() {
		return await this.cat.meow();
	}
}
