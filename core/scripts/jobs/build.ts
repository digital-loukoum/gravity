import fs from "fs-extra";
import { execSync } from "child_process";
import { generate } from "./generate";

export async function build() {
	console.log("Generating files...");
	generate();

	console.log("Cleaning package...");
	fs.rmSync("package", { recursive: true, force: true });

	console.log("Compiling typescript...");
	execSync(`tsc`, {
		stdio: "inherit",
	});

	console.log("Copying configuration files...");
	fs.copyFileSync("./README.md", "./package/README.md");
	fs.copyFileSync("./package.json", "./package/package.json");
}
