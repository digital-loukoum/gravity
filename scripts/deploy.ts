import workspaces from "../workspaces.json";
import { bumpVersion } from "./utilities/bumpVersion";
import { execSync } from "child_process";
import { print } from "@digitak/print";
import { updateWorkspacesVersion } from "./utilities/updateWorkspacesVersion";
import { execute } from "./utilities/execute";
import path from "path";

print`[blue: Starting deploy...]`;

bumpVersion();
updateWorkspacesVersion();
deploy();

async function deploy() {
	try {
		await Promise.all(
			workspaces.map(async (workspace) => {
				const cwd = path.resolve(workspace);

				await execute(`npm run build`, { cwd });
				print`[green: [bold:${workspace}] • Compilation successful 😉]`;

				await execute(`npm publish`, { cwd });
				print`[green: [bold:${workspace}] • Publication successful 🤗]`;
			}),
		);
	} catch (error) {
		// print`[red: －－－ [bold:${workspace}] • An error occured during deploy －－－]`;
		print`[red: －－－ An error occured during deploy －－－]`;
		console.log(error, "\n");
		process.exit(1);
	}

	print`\n[green.bold: Deploy done 🎉]\n`;
}
