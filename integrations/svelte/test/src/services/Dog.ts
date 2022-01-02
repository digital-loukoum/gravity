import { Service } from '@digitak/gravity/services/Service';
import { Public } from './decorators/Public';

export class dog extends Service {
	name = 'Some dog name';

	@Public
	woof() {
		return 'woof';
	}

	attack() {
		return 'WOOF! WOOF!';
	}
}
