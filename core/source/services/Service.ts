import { BaseService, BaseServiceConstructor } from "./BaseService";
import { defineBaseService } from "./defineBaseService";

/**
 * A default service with no context
 * Usually the user will define its own service with its own context
 */
export const Service: BaseServiceConstructor<undefined> = defineBaseService(
	class Service extends BaseService<undefined> {},
);
