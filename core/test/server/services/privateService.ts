import { Private } from "../guards/Private";
import { Service } from "../Service";

@Private
export class privateService extends Service {
	rawString = "onlyForPrivate";

	onlyForPrivate() {
		return "onlyForPrivate";
	}

	nested = {
		value: 12,
	};
}
