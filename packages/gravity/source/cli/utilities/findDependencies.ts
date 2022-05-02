import { findPackageInfos } from "./findPackageInfos.js";

export function findDependencies(): Array<string> {
	const packageInfos = findPackageInfos();

	let dependencies = <Array<string>>[];

	if (packageInfos) {
		dependencies.push(
			...Object.keys((packageInfos.dependencies || {}) as object),
			...Object.keys((packageInfos.devDependencies || {}) as object),
			...Object.keys((packageInfos.peerDependencies || {}) as object),
		);
	}

	return dependencies;
}
