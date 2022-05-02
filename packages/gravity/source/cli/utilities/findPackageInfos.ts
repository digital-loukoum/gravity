import fs from "fs";
import { findClosestFile } from "./findClosestFile.js";

let packageInfos: undefined | null | Record<string, unknown> = undefined;

/**
 * Find the closest "package.json" file and load it.
 */
export function findPackageInfos(): Record<string, unknown> | null {
	if (packageInfos !== undefined) return packageInfos;
	const packageJson = findClosestFile("package.json");
	if (!packageJson) return null;
	return JSON.parse(fs.readFileSync(packageJson, "utf8"));
}
