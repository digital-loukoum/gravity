import { Service } from "../Service";

export class math extends Service {
	add(x: number, y: number) {
		return x + y;
	}

	subtract(x: number, y: number) {
		return x - y;
	}
}
