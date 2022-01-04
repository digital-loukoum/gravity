import { Service } from '../Service';

export class time extends Service {
	now() {
		return Date.now();
	}
}
