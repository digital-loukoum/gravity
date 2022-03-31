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
	schemaLocation?: string;

	/**
	 * The source directory where lives the server code
	 */
	serverSourceDirectory?: string;

	/**
	 * Whether to run in watch mode or not
	 */
	watch?: boolean;

	/**
	 * Whether to log messages or stay silent
	 */
	verbose?: boolean;

	/**
	 * Optional options to pass to esbuild when building the server
	 */
	esbuildOptions?: BuildOptions;
};
