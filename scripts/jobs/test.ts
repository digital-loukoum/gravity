import workspaces from "../../workspaces.json";
import { print } from "@digitak/print";
import { execute } from "./../utilities/execute";
import path from "path";

import { build } from "./build";

export async function test() {
	await build();

	print`[yellow: Starting tests...]`;

	try {
		await Promise.all(
			workspaces.map(async (workspace) => {
				const cwd = path.resolve(workspace);

				await execute(`npm test`, { cwd });
				print`[blue: [bold:${workspace}] • Test passed 🤗]`;
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
