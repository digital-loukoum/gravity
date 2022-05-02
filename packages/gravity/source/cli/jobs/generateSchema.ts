import type { Type } from "typezer";
import { Typezer } from "typezer";
import type { GravityCliOptions } from "../GravityCliOptions.js";
import fs from "fs-extra";
import { join } from "path";
import { extractServicesFromSchema } from "../utilities/extractServicesFromSchema.js";
import print from "@digitak/print";
import { resolveCliOptions } from "../utilities/resolveCliOptions.js";

export type GravityGenerateSchemaOptions = Pick<
	GravityCliOptions,
	"servicesFile" | "watch" | "verbose" | "schemaFile"
>;

export function generateSchema(options?: GravityGenerateSchemaOptions) {
	const { servicesFile, schemaFile, verbose, watch } =
		resolveCliOptions(options);

	if (!fs.existsSync(servicesFile)) {
		print.error`\n  ❌ [white: Could not find services file at [bold:'${servicesFile}']]\n`;
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
