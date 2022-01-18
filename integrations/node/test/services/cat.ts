import { BaseService } from "@digitak/gravity/services/BaseService";

const sleep = (value: number) =>
	new Promise((resolve) => setTimeout(resolve, value));

export class cat extends BaseService {
	name = "A cat";

	async meow() {
		await sleep(200);
		return `Meow!`;
	}
	async attack(target: string) {
		// await sleep(100);
		return `[attack: ${target}] Meow!!!`;
	}
}
