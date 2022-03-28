import { BaseService } from "../../../source/services/BaseService";

export class math extends BaseService {
	add(x: number, y: number) {
		return x + y;
	}
}
