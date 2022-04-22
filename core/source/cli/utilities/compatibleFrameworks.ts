import chalk from "chalk";

export type CompatibleFramework = keyof typeof compatibleFrameworks;

export const compatibleFrameworks = {
	gravity: chalk.gray("no framework"),
	svelte: chalk.redBright("svelte"),
	"svelte-kit": chalk.redBright("svelte-kit"),
	react: chalk.blue("react"),
	next: chalk.blue("next"),
	solid: chalk.magenta("solid"),
	vue: chalk.green("vue 3"),
	nuxt: chalk.green("nuxt 3"),
} as const;
