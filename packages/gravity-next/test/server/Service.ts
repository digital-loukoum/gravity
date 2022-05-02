import { BaseService } from "@digitak/gravity";
import { Context } from "./Context";

export class Service extends BaseService<Context> {
	bar() {
		return "bar";
	}
}
