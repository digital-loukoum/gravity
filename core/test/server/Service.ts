import { BaseService } from "../../source/services/BaseService";
import { foo } from "./services/foo";

export class Service extends BaseService {
	protected get fooService() {
		return this.useService(foo);
	}

	bar() {
		return "bar";
	}
}
