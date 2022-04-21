import cliSelect from "cli-select";
import chalk from "chalk";

export async function select<T extends string>(
	ask: string,
	values: Record<string, T>,
	selectSymbol = chalk.bold("•"),
): Promise<T | undefined> {
	try {
		console.log(`${chalk.yellow.bold("→")} ${ask}`);
		return (
			await cliSelect<T>({
				values,
				selected: chalk.gray("(") + selectSymbol + chalk.gray(")"),
				unselected: chalk.gray("(") + chalk.gray(" ") + chalk.gray(")"),
				valueRenderer: (value, selected) =>
					selected ? chalk.underline(value) : value,
			})
		).value;
	} catch (error) {
		return undefined;
	}
}
