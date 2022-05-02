import fs from "fs-extra";
import { findClosestFile } from "./findClosestFile.js";
import { findPackageInfos } from "./findPackageInfos.js";

/**
 * Update package.json with the given object.
 */
export function updatePackageInfos(options: Record<string, unknown>) {
	const originalPackageInfos = findPackageInfos();
	if (!originalPackageInfos) return;
	const packageInfos = { ...originalPackageInfos, ...options };
	const packageJson = JSON.stringify(packageInfos, null, 2);
	const packageJsonPath = findClosestFile("package.json")!;
	fs.writeFileSync(packageJsonPath, packageJson);
}
