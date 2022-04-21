import { searchDependencies } from "../utilities/searchDependencies.js";
import { select } from "../utilities/select.js";
import { ask } from "../utilities/ask.js";
import { findPackageManager } from "../utilities/findPackageManager.js";
import { execSync } from "child_process";
import type { CompatibleFramework } from "../utilities/compatibleFrameworks.js";
import { compatibleFrameworks } from "../utilities/compatibleFrameworks.js";
import { copyTemplates } from "../utilities/copyTemplates.js";
import fs from "fs-extra";

export type GravityCreateOptions = {
	manual?: boolean;
};

export async function create(
	options: GravityCreateOptions = {},
): Promise<void> {
	const { manual = false } = options;
	const frameworks: Array<CompatibleFramework> = [];

	if (manual) {
		const selected = await select<CompatibleFramework>(
			"Which framework do you want to use along Gravity?",
			compatibleFrameworks,
		);
		if (selected === undefined) return;
		if (selected !== "none") {
			frameworks.push(selected);
		}
	} else {
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
			console.log(
				`The following frameworks were found:\n${frameworks
					.map((framework) => `- ${framework}`)
					.join("\n")}`,
			);
			const ok = await ask(
				`Do you want to install Gravity along these frameworks?`,
			);
			if (!ok) return create({ ...options, manual: true });
			frameworks.push(...guessedFrameworks);
		}
	}

	const packageManager = await findPackageManager();
	if (!packageManager) return;

	/**
	 * 1. Ensure package.json exists
	 */
	if (!fs.existsSync("package.json")) {
		execSync(`${packageManager} init --yes`, { stdio: "inherit" });
		console.log("→ package.json created");
	}

	/**
	 * 2. Install packages
	 */
	console.log(`Installing Gravity...`);
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
	);

	console.log("→ Gravity packages installed");

	/**
	 * 3. Copy templates into the source directory
	 */
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

	await copyTemplates(templates);

	console.log("→ Templates copied");

	/**
	 * 4. Add schema.json to .gitignore
	 */
	const ignoreSchema = "\nschema.json\n";
	fs.ensureFileSync(".gitignore");
	if (!fs.readFileSync(".gitignore", "utf-8").includes(ignoreSchema)) {
		fs.appendFileSync(".gitignore", ignoreSchema);
		console.log("→ schema.json added to .gitignore");
	}
}
