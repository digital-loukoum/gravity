import fs from "fs";
import { resolve } from "path";

/**
 * Try to find the schema.js file in the given location
 */
export function findSchemaFile(location = ""): string | undefined {
	// exact path to a file
	if (fs.existsSync(location) && fs.statSync(location).isFile()) {
		return location;
	}

	// else we have a directory name
	let directory: string | null = location;
	do {
		const schemaFile = resolve(
			location,
			"node_modules",
			".gravity",
			"schema.json",
		);
		if (fs.existsSync(schemaFile)) return schemaFile;
		directory = directory ? resolve(location, "..") : null;
	} while (directory != null);
}
