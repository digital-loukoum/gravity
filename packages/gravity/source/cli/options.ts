import type { Sade } from "sade";

const defineOptions = <
	Options extends Record<string, [string, string, string?]>,
>(
	options: Options,
) => options;

export const options = defineOptions({
	manual: ["--manual", "Manually select options"],
	destination: ["--destination", "Path location"],
	entryFile: ["--entry [file]", "Entry file path"],
	outputFile: ["--output [file]", "Output file resulting from the build"],
	watch: ["--watch", "Pass this option to watch schema changes"],
	verbose: ["--no-logs", "Set to false to prevent console logs"],
	use: ["--use", "Another command to use along the main gravity command"],
	bundleDependencies: [
		"--bundle-dependencies",
		"Bundle dependencies in build output",
	],
	servicesFile: [
		"--services [file]",
		"Path to the file that exports the services",
	],
	schemaFile: [
		"--schema [file]",
		"Path to schema.json file\nCan be a directory; in that case all parents node_modules/.gravity/schema.json will be searched until a match is found",
	],
	schemaless: [
		"--schemaless",
		"Run gravity in schemaless mode. In this mode, gravity will not generate a schema file and will not validate server functions input.",
	],
});

export const esBuildOptionsProperties: Array<{
	option: string;
	key: string;
	description: string;
	getValue?: (value: string) => any;
}> = [
	{
		option: "--minify",
		key: "minify",
		description: "Minify the output",
		getValue: (value: string) => (value ? JSON.parse(value) : true),
	},
	{
		option: "--format",
		key: "format",
		description: "iife | cjs | esm",
	},
	{
		option: "--sourcemap",
		key: "sourcemap",
		description: "linked | external | inline | both",
	},
	{
		option: "--platform",
		key: "platform",
		description: "node | neutral",
	},
	{
		option: "--target",
		key: "target",
		description: "A list of target environment for the generated Javascript",
	},
	{
		option: "--jsx",
		key: "jsx",
		description: "Preserve JSX instead of transofrming it",
	},
	{
		option: "--jsx-factory",
		key: "jsxFactory",
		description: "Specify wich function to use to transform JSX",
	},
	{
		option: "--jsx-fragment",
		key: "jsxFragment",
		description: "Specify wich function to use to transform JSX fragments",
	},
	{
		option: "--keep-names",
		key: "keepNames",
		description: "Specify whether to keep names of functions and classes",
		getValue: (value: string) => (value ? JSON.parse(value) : true),
	},
	{
		option: "--legal-comments",
		key: "legalComments",
		description: "none | inline | eof | linked | external",
	},
	{
		option: "--tree-shaking",
		key: "treeShaking",
		description: "true | false",
		getValue: (value: string) => (value ? JSON.parse(value) : true),
	},
	{
		option: "--tsconfig",
		key: "tsconfig",
		description: "Path to a tsconfig.json file",
	},
];

export const useEsBuildOptions = (program: Sade): Sade => {
	for (const { option, description } of esBuildOptionsProperties) {
		program.option(option, description);
	}
	return program;
};
