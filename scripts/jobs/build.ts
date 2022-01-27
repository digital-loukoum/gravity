import workspaces from "../../workspaces.json";
import path from "path";
import { execute } from "../utilities/execute";
import { print } from "@digitak/print";
import { bumpVersion } from "../utilities/bumpVersion";
import { updateWorkspacesVersion } from "../utilities/updateWorkspacesVersion";

export async function build() {
	print`[yellow: Starting build...]`;

	bumpVersion();
	updateWorkspacesVersion();

	try {
		await Promise.all(
			workspaces.map(async (workspace) => {
				const cwd = path.resolve(workspace);

				await execute(`npm run build`, { cwd });

				print`[blue: [bold:${workspace}] • Compilation successful 😉]`;
			}),
		);
	} catch (error) {
		// print`[red: －－－ [bold:${workspace}] • An error occured during build －－－]`;
		print`[red: －－－ An error occured during build －－－]`;
		console.log(error, "\n");
		process.exit(1);
	}

	print`\n[green.bold: Build done ✨]\n`;
}
