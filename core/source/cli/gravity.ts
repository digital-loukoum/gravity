#!/usr/bin/env node
import sade from "sade";
import { generateSchema } from "./jobs/generateSchema.js";
import { develop } from "./jobs/develop.js";
import { build } from "./jobs/build.js";
import { preview } from "./jobs/preview.js";
import { version } from "../version.js";
import { create } from "./jobs/create.js";

const program = sade("gravity");
program.version(version);

const defineOptions = <
	Options extends Record<string, [string, string, string?]>,
>(
	options: Options,
) => options;

const options = defineOptions({
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

// gravity create
program
	.command("create")
	.describe("Scaffold a new Gravity project")
	.option(...options.manual)
	.option(...options.destination)
	.action((options) => {
		create({
			manual: options?.["manual"],
			destination: options?.["destination"] || ".",
		});
	});

// gravity dev
program
	.command("dev")
	.describe("Run gravity server in development mode")
	.option(...options.entryFile)
	.option(...options.servicesFile)
	.option(...options.schemaFile)
	.option(...options.use)
	.action((options) => {
		develop({
			entryFile: options["entry"],
			servicesFile: options["services"],
			schemaFile: options["schema"],
		});
	});

// gravity build
program
	.command("build")
	.describe("Build gravity server for production")
	.option(...options.entryFile)
	.option(...options.outputFile)
	.option(...options.servicesFile)
	.option(...options.schemaFile)
	.option(...options.use)
	.option("--esbuild:*", "Custom esbuild options")
	.action((options) => {
		const esbuildOptions: any = {};

		for (let option in options) {
			if (!option.startsWith("esbuild:")) continue;
			option = option.slice("esbuild:".length).trim();
			esbuildOptions[option] = options[option];
		}

		build({
			entryFile: options["entry"],
			servicesFile: options["services"],
			outputFile: options["output"],
			schemaFile: options["schema"],
			esbuildOptions,
		});
	});

// gravity generate:schema
program
	.command("generate schema")
	.describe("Generate the api schema from the services")
	.option(...options.watch)
	.option(...options.verbose)
	.option(...options.servicesFile)
	.option(...options.schemaFile)
	.action((options) => {
		generateSchema({
			servicesFile: options["services"],
			watch: options["watch"],
			verbose: !options["no-logs"],
			schemaFile: options["schema"],
		});
	});

// gravity preview
program
	.command("preview")
	.describe("Preview the server")
	.option(...options.outputFile)
	.action((options) => {
		preview({
			outputFile: options["output"],
		});
	});

program.parse(process.argv);
