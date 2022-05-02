import { Service } from '../Service';

export class math extends Service {
	add(x: number, y: number): number {
		return x + y;
	}
}
