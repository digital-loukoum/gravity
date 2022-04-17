import { defineGuard, ServerError } from "../../../source";
import type { Service } from "../Service";

export const Admin = defineGuard<Service>(({ context }) => {
	if (!context.user.isAdmin) {
		throw new ServerError(`Forbidden access`);
	}
});
