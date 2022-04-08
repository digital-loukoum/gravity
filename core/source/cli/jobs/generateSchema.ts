import type { Type } from "typezer";
import { Typezer } from "typezer";
import type { GravityCliOptions } from "../GravityCliOptions";
import fs from "fs-extra";
import { join } from "path";
import { extractServicesFromSchema } from "../utilities/extractServicesFromSchema";
import print from "@digitak/print";
import { findSchemaFile } from "../utilities/findSchemaFile";

export type GravityGenerateSchemaOptions = Pick<
	GravityCliOptions,
	| "servicesFile"
	| "serverSourceDirectory"
	| "watch"
	| "verbose"
	| "schemaLocation"
>;

export function generateSchema({
	serverSourceDirectory = "./src",
	servicesFile = "services/index.ts",
	schemaLocation = "",
	watch = false,
	verbose = true,
}: GravityGenerateSchemaOptions = {}) {
	servicesFile = join(serverSourceDirectory, servicesFile);

	if (!fs.existsSync(servicesFile)) {
		print.error`\n  ❌ [white: Could not find services file at [bold:'${servicesFile}']]\n`;
		return;
	}

	const schemaFile = findSchemaFile(schemaLocation);
	if (!schemaFile) {
		print.error`\n  ❌ [white: Could not find [underline:.gravity/schema.json] file at [bold:'${schemaLocation}']\n`;
		return;
	}

	const typezer = new Typezer({
		files: [servicesFile],
		symbols: ["services"],
	});

	const generate = (schema: Record<string, Type>) => {
		const services = extractServicesFromSchema(schema);
		fs.ensureFileSync(schemaFile);
		fs.writeFileSync(schemaFile, JSON.stringify(services, null, 2));

		if (verbose) {
			print`[bold.green:✔️] [underline:Schema generated]`;
		}
	};

	if (watch) {
		typezer.watch(generate);
	} else {
		generate(typezer.schema);
	}
}
