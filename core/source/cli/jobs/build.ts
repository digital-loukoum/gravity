import fs from "fs-extra";
import print from "@digitak/print";
import { build as esbuild } from "esbuild";
import type { GravityCliOptions } from "../GravityCliOptions.js";
import { generateSchema } from "./generateSchema.js";
import { resolveCliOptions } from "../utilities/resolveCliOptions.js";
import { execSync } from "child_process";

export type GravityBuildOptions = Pick<
	GravityCliOptions,
	"entryFile" | "schemaFile" | "servicesFile" | "outputFile" | "esbuildOptions"
>;

export async function build(options: GravityBuildOptions = {}) {
	const {
		entryFile,
		servicesFile,
		schemaFile,
		outputFile,
		esbuildOptions,
		use,
	} = resolveCliOptions(options);

	if (!fs.existsSync(entryFile)) {
		print.error`\n  ❌ [white: Could not find entry file [bold:'${entryFile}']]\n`;
		return;
	}

	generateSchema({
		servicesFile,
		schemaFile,
	});

	if (use) {
		execSync(use, { stdio: "inherit" });
	} else {
		esbuild({
			entryPoints: [entryFile],
			outfile: outputFile,
			target: "es2020",
			minify: true,
			bundle: true,
			sourcemap: false,
			format: "cjs",
			platform: "node",
			...esbuildOptions,
		});
	}
}
