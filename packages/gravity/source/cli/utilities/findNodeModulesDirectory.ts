import { resolve } from "path";
import { findClosestFile } from "./findClosestFile.js";

export function findNodeModulesDirectory(
	path: string = "",
): string | undefined {
	return findClosestFile(resolve(path, "node_modules"));
}
