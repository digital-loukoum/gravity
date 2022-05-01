import fs from "fs-extra";
import { packages } from "./workspace";

export function updateWorkspacesVersion() {
	const file = "package.json";
	const version = JSON.parse(fs.readFileSync(file, "utf8")).version;

	for (const packageName of packages) {
		const workspaceFile = `${packageName}/package.json`;
		const packageInfos = JSON.parse(fs.readFileSync(workspaceFile, "utf8"));
		packageInfos.version = version;
		fs.writeFileSync(workspaceFile, JSON.stringify(packageInfos, null, "\t"));
	}
}
