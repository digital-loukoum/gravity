import workspaces from "../workspaces.json";
import { bumpVersion } from "./utilities/bumpVersion";
import { execSync } from "child_process";
import { print } from "@digitak/print";
import { updateWorkspacesVersion } from "./utilities/updateWorkspacesVersion";

const rootDirectory = process.cwd();

let error = false;

print`[blue: Starting build...]`;

bumpVersion();
updateWorkspacesVersion();

for (const workspace of workspaces) {
	process.chdir(workspace);
	try {
		execSync(`pnpm run build ${workspace} run build`);
		print`[green: [bold:${workspace}] • Compilation successful 😉]`;
	} catch (error) {
		print`[red: －－－ [bold:${workspace}] • An error occured during build －－－]`;
		console.log(error, "\n");
		error = true;
	}
	process.chdir(rootDirectory);
	if (error) break;
}

if (!error) {
	print`\n[green.bold: Build done ✨]\n`;
}
