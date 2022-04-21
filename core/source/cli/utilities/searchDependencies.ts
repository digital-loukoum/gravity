import { findDependencies } from "./findDependencies.js";

export function searchDependencies<Dependencies extends string>(
	search: Record<Dependencies, Array<string>>,
): Array<Dependencies> {
	const result: Array<Dependencies> = [];
	const dependencies = findDependencies();

	for (const dependency in search) {
		const searchDependencies = search[dependency];
		if (
			dependencies.some((dependency) => searchDependencies.includes(dependency))
		) {
			result.push(dependency as Dependencies);
		}
	}

	return result;
}
