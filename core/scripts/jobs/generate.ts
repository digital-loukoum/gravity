import { readFileSystem } from "../utilities/readFileSystem";
import fs from "fs-extra";

export async function generate() {
	/**
	 * Generate version
	 */
	const version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
	fs.writeFileSync(
		"source/version.ts",
		`export const version = "${version}";\n`,
	);

	/**
	 * Generate templates
	 */
	const templatesData = await readFileSystem("templates");
	if (!templatesData) {
		console.error(`❌ Could not read templates. Are you in "gravity/core"?`);
		return;
	}

	const templatesContent = `export const templates = ${JSON.stringify(
		templatesData,
		null,
		2,
	)};\n`;

	fs.writeFileSync("source/cli/templates.ts", templatesContent);
	console.log("✨ Templates generated");
}
