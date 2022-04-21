import { searchDependencies } from "../utilities/searchDependencies.js";
import { select } from "../utilities/select.js";
import { ask } from "../utilities/ask.js";
import { findPackageManager } from "../utilities/findPackageManager.js";
import { execSync } from "child_process";
import type { CompatibleFramework } from "../utilities/compatibleFrameworks.js";
import { compatibleFrameworks } from "../utilities/compatibleFrameworks.js";
import { copyTemplates } from "../utilities/copyTemplates.js";
import fs from "fs-extra";
import chalk from "chalk";
import { join } from "path";
import { findPackageInfos } from "../utilities/findPackageInfos.js";

export type GravityCreateOptions = {
	destination?: string;
	manual?: boolean;
};

export async function create(
	options: GravityCreateOptions = {},
): Promise<void> {
	const manual = options?.manual ?? false;
	const destination = options?.destination || ".";

	const stage = (stageName: string) =>
		console.log(
			`\n${chalk.yellow.bold("→")} ${chalk.italic(stageName + "...")}`,
		);
	const done = (message: string) =>
		console.log(`${chalk.green.bold("✔️")} ${chalk.bold(message)}`);

	/**
	 * 1. Ensure destination directory exists
	 */
	if (destination) {
		fs.ensureDirSync(destination);
	}

	/**
	 * 2. Find which package manager to use
	 */
	const packageManager = await findPackageManager();
	if (!packageManager) return;

	/**
	 * 3. Ensure package.json exists
	 */
	if (!fs.existsSync(join(destination, "package.json"))) {
		stage("Creating package.json");
		execSync(`${packageManager} init --yes`, {
			cwd: destination,
			stdio: "ignore",
		});
		done("package.json created");
	}

	/**
	 * 4. Read package.json and detect dependencies
	 */
	const frameworks: Array<CompatibleFramework> = [];

	if (manual) {
		const selected = await select(
			"Which framework do you want to use along Gravity?",
			compatibleFrameworks,
		);
		if (selected === undefined) return;
		if (selected !== "none") {
			frameworks.push(selected);
			done(`Using Gravity with ${compatibleFrameworks[selected]}`);
		} else {
			done("Using Gravity without any framework");
		}
	} else {
		stage("Detecting frameworks");
		const guessedFrameworks = searchDependencies({
			svelte: ["svelte"],
			"svelte-kit": ["@sveltejs/kit"],

			solid: ["solid-js"],

			react: ["react", "react-dom"],
			next: ["next"],

			vue: ["vue"],
			nuxt: ["nuxt"],
		});

		if (guessedFrameworks.length) {
			guessedFrameworks.forEach((framework) =>
				done(`Detected ${compatibleFrameworks[framework]}`),
			);
			const ok = await ask(
				`Do you want to install Gravity with ${guessedFrameworks
					.map((framework) => chalk.bold(compatibleFrameworks[framework]))
					.join(" and ")}?`,
			);
			if (ok === undefined) return;
			if (!ok) return create({ ...options, manual: true });
			frameworks.push(...guessedFrameworks);
			guessedFrameworks.forEach((framework) =>
				done(`Using ${compatibleFrameworks[framework]}`),
			);
		} else {
			done("No front-end framework detected");
		}
	}

	/**
	 * 5. Install packages
	 */
	stage(`Installing Gravity packages`);
	const installCommand = {
		npm: "install",
		yarn: "add",
		pnpm: "add",
	};
	const packagesToInstall = [
		"@digitak/gravity",
		...new Set(
			frameworks.map((framework) => {
				if (framework == "svelte-kit") framework = "svelte";
				return `@digitak/gravity-${framework}`;
			}),
		),
	];
	execSync(
		`${packageManager} ${
			installCommand[packageManager]
		} ${packagesToInstall.join(" ")}`,
		{
			cwd: destination,
			stdio: "ignore",
		},
	);

	packagesToInstall.forEach((packageName) =>
		done(`${chalk.underline(packageName)} installed`),
	);

	/**
	 * 6. Copy templates into the source directory
	 */
	stage("Copying necessary files");
	const templates = <string[]>[];
	const backEndFrameworks = ["none", "svelte-kit", "next", "nuxt"];

	if (
		!frameworks.length ||
		frameworks.some((framework) => backEndFrameworks.includes(framework))
	) {
		templates.push(`server`);
	}

	for (const framework of frameworks) {
		if (framework != "none") templates.push(framework);
	}

	await copyTemplates(templates, destination);

	done("Files copied");

	/**
	 * 7. Add schema.json to .gitignore
	 */
	const ignoreSchema = "\nschema.json\n";
	const gitIgnoreFile = join(destination, ".gitignore");
	fs.ensureFileSync(gitIgnoreFile);
	if (!fs.readFileSync(gitIgnoreFile, "utf-8").includes(ignoreSchema)) {
		stage("Adding schema.json to .gitignore");
		fs.appendFileSync(gitIgnoreFile, ignoreSchema);
		done("schema.json added to .gitignore");
	}

	/**
	 * 8. Patching npm scripts
	 */
	// stage("Patching npm scripts");
	// let scripts: Record<string, string> = findPackageInfos()?.scripts
	// if (typeof scripts != "object") scripts = {}
	// scripts

	console.log("\n✨ Gravity is ready\n");
}
