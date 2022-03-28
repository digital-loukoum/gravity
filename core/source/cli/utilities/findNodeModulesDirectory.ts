import fs from "fs";
import { resolve } from "path";

export function findNodeModulesDirectory(path: string): string | undefined {
	const nodeModulesDirectory = resolve(path, "node_modules");
	if (fs.existsSync(nodeModulesDirectory)) return nodeModulesDirectory;
	if (path === "/") return undefined;
	return findNodeModulesDirectory(resolve(path, ".."));
}
