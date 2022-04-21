import { existsSync } from "fs";
import { select } from "./select.js";

export async function findPackageManager() {
	if (existsSync("yarn.lock")) return "yarn";
	if (existsSync("pnpm-lock.json")) return "pnpm";
	if (existsSync("package-lock.json")) return "npm";
	return await select(`Which package manager do you want to use?`, {
		npm: "npm",
		pnpm: "pnpm",
		yarn: "yarn",
	});
}
