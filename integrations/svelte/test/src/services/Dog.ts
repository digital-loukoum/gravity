import { Service } from '@digitak/gravity/services/Service';

export class dog extends Service {
	name = 'Some dog name';

	woof() {
		return 'woof';
	}

	attack() {
		return 'WOOF! WOOF!';
	}
}
