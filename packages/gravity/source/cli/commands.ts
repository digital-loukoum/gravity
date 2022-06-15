import type { Sade } from "sade";
import { create } from "./jobs/create.js";
import { develop } from "./jobs/develop.js";
import { build } from "./jobs/build.js";
import { generateSchema } from "./jobs/generateSchema.js";
import { preview } from "./jobs/preview.js";
import {
	esBuildOptionsProperties,
	options,
	useEsBuildOptions,
} from "./options.js";
import { version } from "../version.js";

const useCommand = (program: Sade, command: string) => {
	if (command) program.command(command);
	return program;
};

export const useVersion = (program: Sade) => {
	return program.version(version);
};

export const useCreate = (program: Sade, command = "create") => {
	return useCommand(program, command)
		.describe("Scaffold a new Gravity project")
		.option(...options.manual)
		.option(...options.destination)
		.action((options) => {
			create({
				manual: options?.["manual"],
				destination: options?.["destination"] || ".",
			});
		});
};

export const useDevelop = (program: Sade, command = "dev") => {
	return useCommand(program, command)
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
				use: options["use"] || "",
			});
		});
};

export const useBuild = (program: Sade, command = "build") => {
	return useEsBuildOptions(
		useCommand(program, command).describe(
			"Build gravity server for production",
		),
	)
		.option(...options.entryFile)
		.option(...options.outputFile)
		.option(...options.servicesFile)
		.option(...options.schemaFile)
		.option(...options.use)
		.action((options) => {
			const esbuildOptions: any = {};

			for (let { option, key, getValue } of esBuildOptionsProperties) {
				option = option.slice(2);
				if (options[option] !== undefined) {
					const value = options[option];
					esbuildOptions[key] = getValue ? getValue(value) : value;
				}
			}

			build({
				entryFile: options["entry"],
				servicesFile: options["services"],
				outputFile: options["output"],
				schemaFile: options["schema"],
				use: options["use"] || "",
				esbuildOptions,
			});
		});
};

export const useGenerateSchema = (
	program: Sade,
	command = "generate schema",
) => {
	return useCommand(program, command)
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
};

export const usePreview = (program: Sade, command = "preview") => {
	return useCommand(program, command)
		.describe("Preview the server")
		.option(...options.outputFile)
		.action((options) => {
			preview({
				outputFile: options["output"],
			});
		});
};
