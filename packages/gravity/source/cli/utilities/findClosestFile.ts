import { existsSync } from "fs";
import { join, resolve } from "path";

export function findClosestFile(fileName: string): string | undefined {
	let directory = resolve("");
	while (true) {
		const file = join(directory, fileName);
		if (existsSync(file)) return file;
		if (directory == "") return undefined;
		directory = resolve(directory, "..");
	}
}
