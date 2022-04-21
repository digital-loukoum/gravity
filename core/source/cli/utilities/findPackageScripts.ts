import { findPackageInfos } from "./findPackageInfos.js";

export function findPackageScripts(): Record<string, string> {
	const packageScripts = findPackageInfos()?.scripts;
	if (!packageScripts || typeof packageScripts != "object") return {};
	return packageScripts as Record<string, string>;
}
