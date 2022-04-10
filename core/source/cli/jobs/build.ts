import { join } from "path";
import fs from "fs-extra";
import print from "@digitak/print";
import { build as esbuild } from "esbuild";
import type { GravityCliOptions } from "../GravityCliOptions.js";
import { generateSchema } from "./generateSchema.js";

export type GravityBuildOptions = Pick<
	GravityCliOptions,
	| "entryFile"
	| "schemaLocation"
	| "servicesFile"
	| "serverSourceDirectory"
	| "outputFile"
	| "esbuildOptions"
>;

export async function build({
	serverSourceDirectory = "./src",
	entryFile = "index.ts",
	servicesFile = "services/index.ts",
	schemaLocation = "",
	outputFile = "dist/index.js",
	esbuildOptions = {},
}: GravityBuildOptions = {}) {
	entryFile = join(serverSourceDirectory, entryFile);

	if (!fs.existsSync(entryFile)) {
		print.error`\n  ❌ [white: Could not entry file [bold:'${entryFile}']]\n`;
		return;
	}

	generateSchema({
		serverSourceDirectory,
		servicesFile,
		schemaLocation,
	});

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
