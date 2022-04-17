import { gravityError } from "../errors/GravityError.js";

export function resolvePath(
	serviceName: string,
	service: unknown,
	path: string[],
): unknown {
	const error = gravityError({
		message: "Target inexistant",
		serviceName,
		target: path.join("/"),
		status: 400,
	});
	let resolved: any = service;

	if (path.length && ["_", "$"].includes(path[0][0])) {
		throw error;
	}

	for (const name of path) {
		if (resolved && typeof resolved == "object" && name in resolved) {
			resolved = resolved[name];
		} else {
			throw error;
		}
	}

	return resolved;
}
