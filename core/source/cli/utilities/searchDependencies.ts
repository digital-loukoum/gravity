import { findDependencies } from "./findDependencies.js";

export function searchDependencies<Dependencies extends string>(
	search: Record<Dependencies, Array<string>>,
): Set<Dependencies> {
	const result = new Set<Dependencies>();
	const dependencies = findDependencies();

	for (const dependency in search) {
		const searchDependencies = search[dependency];
		if (
			dependencies.some((dependency) => searchDependencies.includes(dependency))
		) {
			result.add(dependency as Dependencies);
		}
	}

	return result;
}
