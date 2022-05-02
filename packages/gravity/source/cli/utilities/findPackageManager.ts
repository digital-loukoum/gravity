import chalk from "chalk";
import { existsSync } from "fs";
import { select } from "./select.js";

export async function findPackageManager() {
	if (existsSync("yarn.lock")) return "yarn";
	if (existsSync("pnpm-lock.yaml")) return "pnpm";
	if (existsSync("package-lock.json")) return "npm";
	const result = await select(`Which package manager do you want to use?`, {
		npm: "npm",
		pnpm: "pnpm",
		yarn: "yarn",
	});
	if (result) {
		console.log(chalk.green.bold("→") + " Using " + chalk.bold(result));
	}
	return result;
}
