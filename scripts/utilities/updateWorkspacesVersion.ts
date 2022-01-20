import fs from "fs-extra";
import workspaces from "../../workspaces.json";

export function updateWorkspacesVersion() {
	const file = "package.json";
	const version = JSON.parse(fs.readFileSync(file, "utf8")).version;

	for (const workspace of workspaces) {
		const workspaceFile = `${workspace}/package.json`;
		const packageInfos = JSON.parse(fs.readFileSync(workspaceFile, "utf8"));
		packageInfos.version = version;
		fs.writeFileSync(workspaceFile, JSON.stringify(packageInfos, null, "\t"));
	}
}
