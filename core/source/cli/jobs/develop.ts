import esrun from "@digitak/esrun";
import fs from "fs-extra";
import print from "@digitak/print";
import type { GravityCliOptions } from "../GravityCliOptions.js";
import { generateSchema } from "./generateSchema.js";
import { resolveCliOptions } from "../utilities/resolveCliOptions.js";
import { exec, execSync } from "child_process";

export type GravityDevelopOptions = Pick<
	GravityCliOptions,
	"entryFile" | "servicesFile" | "schemaFile" | "use"
>;

export function develop(options?: GravityCliOptions) {
	const { entryFile, servicesFile, schemaFile, use } =
		resolveCliOptions(options);

	if (!use) {
		if (!fs.existsSync(entryFile)) {
			print.error`\n  ❌ [white: Could not find entry file [bold:'${entryFile}']]\n`;
			return;
		}
	}

	generateSchema({
		servicesFile,
		schemaFile,
		watch: true,
	});

	if (use) {
		// we use another command to run the dev server
		execSync(use, { stdio: "inherit" });
		// const child = exec(use);
		// child.on("data", (data) => console.log(data.toString()));
		// child.on("error", (error) => console.error(error.toString()));
		// child.on("message", (message) => console.log(message.toString()));
		// child.on("close", () => process.exit(1));
	} else {
		esrun(entryFile, {
			watch: true,
		});
	}
}
