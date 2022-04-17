import esrun from "@digitak/esrun";
import { join } from "path";
import fs from "fs-extra";
import print from "@digitak/print";
import type { GravityCliOptions } from "../GravityCliOptions.js";
import { generateSchema } from "./generateSchema.js";
import { resolveCliOptions } from "../utilities/resolveCliOptions.js";

export type GravityDevelopOptions = Pick<
	GravityCliOptions,
	"entryFile" | "servicesFile" | "schemaFile"
>;

export function develop(options?: GravityCliOptions) {
	const { entryFile, servicesFile, schemaFile } = resolveCliOptions(options);

	if (!fs.existsSync(entryFile)) {
		print.error`\n  ❌ [white: Could not find entry file [bold:'${entryFile}']]\n`;
		return;
	}

	generateSchema({
		servicesFile,
		schemaFile,
		watch: true,
	});

	esrun(entryFile, {
		watch: true,
	});
}
