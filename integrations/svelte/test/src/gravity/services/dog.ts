import { Public } from '../decorators/Public';
import { Service } from '../Service';

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
