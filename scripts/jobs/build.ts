import packages from "../packages.json";
import path from "path";
import { execute } from "../utilities/execute";
import { print } from "@digitak/print";

export async function build() {
	print`[yellow: Starting build...]`;

	try {
		await Promise.all(
			packages.map(async (pack) => {
				const cwd = path.resolve(pack);

				await execute(`npm run build`, { cwd });

				print`[blue: [bold:${pack}] • Compilation successful 😉]`;
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
