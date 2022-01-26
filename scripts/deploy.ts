import workspaces from "../workspaces.json";
import { print } from "@digitak/print";
import { execute } from "./utilities/execute";
import path from "path";

import "./test";

print`[blue: Starting deploy...]`;

deploy();

async function deploy() {
	try {
		await Promise.all(
			workspaces.map(async (workspace) => {
				const cwd = path.resolve(workspace);

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
