import cliSelect from "cli-select";
import chalk from "chalk";

export async function select<
	Key extends string = string,
	Value extends string = string,
>(
	ask: string,
	values: Record<Key, Value>,
	selectSymbol = chalk.bold("•"),
): Promise<Key | undefined> {
	try {
		console.log(`\n${chalk.yellow.bold("→")} ${chalk.italic(ask)}`);
		return (
			await cliSelect<Value>({
				values,
				selected: chalk.gray("(") + selectSymbol + chalk.gray(")"),
				unselected: chalk.gray("(") + chalk.gray(" ") + chalk.gray(")"),
				valueRenderer: (value, selected) =>
					selected ? chalk.underline(value) : value,
			})
		).id as Key;
	} catch (error) {
		return undefined;
	}
}
