import type { BuildOptions } from "esbuild";

export type GravityCliOptions = {
	/**
	 * Path of the entry file of Gravity's server
	 */
	entryFile?: string;

	/**
	 * Path of the output of the build
	 */
	outputFile?: string;

	/**
	 * Location of the file that exports the services
	 */
	servicesFile?: string;

	/**
	 * Directory or file where the schema is located
	 * If a directory path is given, then Gravity will look for all parent 'node_modules' directories
	 */
	schemaFile?: string;

	/**
	 * Whether to run in watch mode or not
	 */
	watch?: boolean;

	/**
	 * Whether to log messages or stay silent
	 */
	verbose?: boolean;

	/**
	 * Another command to use along the main gravity command
	 */
	use?: string;

	/**
	 * Whether to run Gravity in schemaless mode.
	 * In schemaless mode, Gravity will not look for a schema file, will not generate one, and will not validate server function arguments.
	 */
	schemaless?: boolean;

	/**
	 * Optional options to pass to esbuild when building the server
	 */
	esbuildOptions?: Pick<
		BuildOptions,
		| "minify"
		| "format"
		| "sourcemap"
		| "platform"
		| "target"
		| "jsx"
		| "jsxFactory"
		| "jsxFragment"
		| "keepNames"
		| "legalComments"
		| "treeShaking"
		| "tsconfig"
	>;

	/**
	 * Also bundle third party libraries when building.
	 */
	bundleDependencies?: boolean;
};
