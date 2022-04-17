import { Service } from "../Service";

/**
 * This is a sample service
 */
export class math extends Service {
	add(x: number, y: number): number {
		return x + y;
	}

	subtract(x: number, y: number): number {
		return x - y;
	}
}
