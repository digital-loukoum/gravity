import { BaseService } from "../services/BaseService";
import { GravityError } from "../errors/GravityError";

const privateIndicators = ["_", "$"];

export function resolvePath(
	serviceName: string,
	service: BaseService<unknown>,
	path: string[],
): unknown {
	let resolved: any = service;

	for (const name of path) {
		if (
			resolved &&
			typeof resolved == "object" &&
			!privateIndicators.includes(name[0])
		) {
			resolved = resolved[name];
		} else {
			throw new GravityError("gravity/operation-not-in-service", {
				message: `Operation '${path.join(
					"/",
				)}' does not exist in service '${serviceName}'.`,
				status: 400,
			});
		}
	}

	return resolved;
}
