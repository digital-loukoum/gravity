import type { GravityCliOptions } from "../GravityCliOptions.js";
import { findPackageInfos } from "./findPackageInfos.js";

export function resolveCliOptions(
	cliOptions?: GravityCliOptions,
): Required<GravityCliOptions> {
	const packageInfos = findPackageInfos();

	const defaultOptions: Required<GravityCliOptions> = {
		entryFile: "src/index.ts",
		outputFile: "dist/index.js",
		servicesFile: "src/services/index.ts",
		schemaFile: "src/schema.json",
		watch: false,
		verbose: true,
		esbuildOptions: {},
	};

	return Object.assign(defaultOptions, packageInfos?.gravity, cliOptions);
}
