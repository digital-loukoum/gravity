import workspaces from "../workspaces.json";
import { print } from "@digitak/print";
import { execute } from "./utilities/execute";
import path from "path";

import "./build";

print`[blue: Starting tests...]`;

test();

async function test() {
	try {
		await Promise.all(
			workspaces.map(async (workspace) => {
				const cwd = path.resolve(workspace);

				await execute(`npm test`, { cwd });
				print`[green: [bold:${workspace}] • Test passed 🤗]`;
			}),
		);
	} catch (error) {
		// print`[red: －－－ [bold:${workspace}] • An error occured during test －－－]`;
		print`[red: －－－ An error occured during tests －－－]`;
		console.log(error, "\n");
		process.exit(1);
	}

	print`\n[green.bold: Tests done ✅]\n`;
}
