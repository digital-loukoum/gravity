#!/usr/bin/env node
import sade from "sade";
import fs from "fs";
import { generateSchema } from "./jobs/generateSchema.js";
import { develop } from "./jobs/develop.js";
import { build } from "./jobs/build.js";
import { preview } from "./jobs/preview.js";

let packageInfos: Record<string, unknown>;
try {
	packageInfos = JSON.parse(fs.readFileSync("../package.json", "utf8"));
} catch (error) {
	packageInfos = JSON.parse(fs.readFileSync("../../package.json", "utf8"));
}
const version = <string>packageInfos.version ?? "";

const program = sade("gravity");

program.version(version);

const defineOptions = <
	Options extends Record<string, [string, string, string?]>,
>(
	options: Options,
) => options;

const options = defineOptions({
	entryFile: ["--entry [file]", "Entry file path"],
	outputFile: ["--output [file]", "Output file resulting from the build"],
	watch: ["--watch", "Pass this option to watch schema changes"],
	verbose: ["--no-logs", "Set to false to prevent console logs"],
	serverSourceDirectory: [
		"--server-directory [file]",
		"Directory of the server sources",
	],
	servicesFile: [
		"--services [file]",
		"Path to the file that exports the services",
	],
	schemaLocation: [
		"--schema [file]",
		"Path to schema.json file\nCan be a directory; in that case all parents node_modules/.gravity/schema.json will be searched until a match is found",
	],
});

// gravity develop
program
	.command("develop")
	.describe("Run gravity server in development mode")
	.option(...options.entryFile)
	.option(...options.serverSourceDirectory)
	.option(...options.servicesFile)
	.option(...options.schemaLocation)
	.action((options) => {
		develop({
			entryFile: options["entry"],
			servicesFile: options["services"],
			serverSourceDirectory: options["server-directory"],
			schemaLocation: options["schema"],
		});
	});

// gravity build
program
	.command("build")
	.describe("Build gravity server for production")
	.option(...options.entryFile)
	.option(...options.outputFile)
	.option(...options.serverSourceDirectory)
	.option(...options.servicesFile)
	.option(...options.schemaLocation)
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
			serverSourceDirectory: options["server-directory"],
			outputFile: options["output"],
			schemaLocation: options["schema"],
			esbuildOptions,
		});
	});

// gravity generate:schema
program
	.command("generate:schema")
	.describe("Generate the services' schema")
	.option(...options.watch)
	.option(...options.verbose)
	.option(...options.serverSourceDirectory)
	.option(...options.servicesFile)
	.option(...options.schemaLocation)
	.action((options) => {
		generateSchema({
			servicesFile: options["services"],
			serverSourceDirectory: options["server-directory"],
			watch: options["watch"],
			verbose: !options["no-logs"],
			schemaLocation: options["schema"],
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
