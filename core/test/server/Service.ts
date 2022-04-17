import { BaseService } from "../../source/services/BaseService";
import { Context } from "./Context";

export class Service extends BaseService<Context> {
	bar() {
		return "bar";
	}
}
