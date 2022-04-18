import { defineGuard, ServerError } from "../../../source";
import type { Service } from "../Service";

export const isAdmin = (service: Service) => {
	if (!service.context.user.isAdmin) {
		throw new ServerError(`Forbidden access`);
	}
};

export const Admin = defineGuard(isAdmin);
