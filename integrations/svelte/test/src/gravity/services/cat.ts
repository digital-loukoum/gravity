import { Admin } from '../decorators/Admin';
import { Public } from '../decorators/Public';
import { Service } from '../Service';

const sleep = (value: number) => new Promise((resolve) => setTimeout(resolve, value));

@Public
@Admin
export class cat extends Service {
	name = 'A cat';

	async meow(enemy?: string) {
		await sleep(200);
		return `[to ${enemy ?? 'you'}] Meow!`;
	}

	attack() {
		return 'Shhhhhh!';
	}
}
