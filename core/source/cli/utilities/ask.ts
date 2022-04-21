import chalk from "chalk";
import { select } from "./select.js";

export async function ask(ask: string): Promise<boolean> {
	return (await select(ask, { yes: "yes", no: "no" }, chalk.bold.green("✔"))) ==
		"yes"
		? true
		: false;
}
