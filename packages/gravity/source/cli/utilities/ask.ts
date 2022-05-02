import chalk from "chalk";
import { select } from "./select.js";

export async function ask(ask: string): Promise<boolean | undefined> {
	switch (await select(ask, { yes: "yes", no: "no" }, chalk.bold.green("✔"))) {
		case "yes":
			return true;
		case "no":
			return false;
		default:
			return undefined;
	}
}
