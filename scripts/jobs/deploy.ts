import packages from "../packages.json";
import { print } from "@digitak/print";
import { execute } from "./../utilities/execute";
import path from "path";
import { build } from "./build";
import { bumpVersion } from "../utilities/bumpVersion";
import { updateWorkspacesVersion } from "../utilities/updateWorkspacesVersion";

export async function deploy() {
	const version = bumpVersion();
	updateWorkspacesVersion();

	await execute(`git add .`);
	await execute(`git commit -m "📌 Version ${version}"`);
	await execute(`git push`);

	await build();

	print`[yellow: Starting deploy...]`;

	try {
		await Promise.all(
			packages.map(async (pack) => {
				const cwd = path.resolve(`${pack}/package`);

				await execute(`npm publish`, { cwd });
				print`[blue: [bold:${pack}] • Publication successful 🤗]`;
			}),
		);
	} catch (error) {
		// print`[red: －－－ [bold:${pack}] • An error occured during deploy －－－]`;
		print`[red: －－－ An error occured during deploy －－－]`;
		console.log(error, "\n");
		process.exit(1);
	}

	print`\n[green.bold: Deploy done 🎉]\n`;
}
