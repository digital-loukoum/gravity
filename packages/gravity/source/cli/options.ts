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
	servicesFile: [
		"--services [file]",
		"Path to the file that exports the services",
	],
	schemaFile: [
		"--schema [file]",
		"Path to schema.json file\nCan be a directory; in that case all parents node_modules/.gravity/schema.json will be searched until a match is found",
	],
});
