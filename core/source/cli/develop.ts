import { Typezer } from "typezer";
import esrun from "@digitak/esrun";
import { findNodeModulesDirectory } from "./utilities/findNodeModulesDirectory";
import fs from "fs-extra";
import { join } from "path";
import { extractServicesFromSchema } from "./utilities/extractServicesFromSchema";

export type GravityDevelopOptions = {
	entryFile?: string;
	servicesFile?: string;
	clientSourceDirectory?: string;
};

export async function develop({
	entryFile = "./src/index.ts",
	servicesFile = "./src/services/index.ts",
	clientSourceDirectory = ".",
}: GravityDevelopOptions = {}) {
	const typezer = new Typezer({
		files: [servicesFile],
		symbols: ["services"],
	});
	const clientNodeModules = findNodeModulesDirectory(clientSourceDirectory);
	if (!clientNodeModules) {
		throw new Error("Could not find client node_modules directory");
	}
	const schemaFile = join(clientNodeModules, ".gravity", "schema.json");

	typezer.watch((schema) => {
		console.dir(schema, { depth: null });
		fs.ensureFileSync(schemaFile);
		fs.writeFileSync(
			schemaFile,
			JSON.stringify(extractServicesFromSchema(schema), null, 2),
		);
	});

	esrun(entryFile, {
		// watch: true,
	});
}
