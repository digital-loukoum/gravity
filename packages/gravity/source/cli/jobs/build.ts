import fs from "fs-extra";
import print from "@digitak/print";
import type { GravityCliOptions } from "../GravityCliOptions.js";
import { generateSchema } from "./generateSchema.js";
import { resolveCliOptions } from "../utilities/resolveCliOptions.js";
import { execSync } from "child_process";
import { findPackageInfos } from "../utilities/findPackageInfos.js";
import { Runner as Builder } from "@digitak/esrun";

export type GravityBuildOptions = Pick<
	GravityCliOptions,
	| "entryFile"
	| "schemaFile"
	| "servicesFile"
	| "outputFile"
	| "esbuildOptions"
	| "bundleDependencies"
	| "use"
	| "schemaless"
	| "verbose"
>;

export async function build(options: GravityBuildOptions = {}) {
	const {
		entryFile,
		servicesFile,
		schemaFile,
		outputFile,
		esbuildOptions,
		use,
		verbose,
		schemaless,
	} = resolveCliOptions(options);

	if (!use) {
		if (!fs.existsSync(entryFile)) {
			print.error`\n  ❌ [white: Could not find entry file [bold:'${entryFile}']]\n`;
			return;
		}
	}

	if (schemaless) {
		const env = globalThis.process.env ?? import.meta.env;
		env.GRAVITY_SCHEMALESS = "true";
	} else {
		generateSchema({
			servicesFile,
			schemaFile,
			verbose,
		});
	}

	if (use) {
		execSync(use, { stdio: "inherit" });
	} else {
		const packageInfos = findPackageInfos();
		const format = packageInfos?.type == "module" ? "esm" : "cjs";

		const builder = new Builder(entryFile, {
			makeAllPackagesExternal: !options?.bundleDependencies,
		});

		await builder.build({
			outfile: outputFile,
			target: "es2020",
			minify: true,
			bundle: true,
			format,
			platform: "node",
			...esbuildOptions,
		});

		fs.ensureFileSync(outputFile);
		fs.writeFileSync(outputFile, builder.outputCode);

		if (verbose) {
			print`[bold.green:✔️] [underline:Build done]`;
		}
	}
}
