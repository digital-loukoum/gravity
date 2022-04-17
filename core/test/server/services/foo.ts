import { Service } from "../Service";

export class foo extends Service {
	foo() {
		return "foo";
	}

	coco = [1, 2, 3];

	nested = {
		value: 12,
	};
}
