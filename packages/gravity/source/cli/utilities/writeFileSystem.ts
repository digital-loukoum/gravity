import fs from "fs-extra";
import { join } from "path";

type FileSystemDirectory = { [Key: string]: string | FileSystemDirectory };

export async function writeFileSystem(
	directory: FileSystemDirectory | string | undefined,
	destination: string,
) {
	if (!directory) return;

	if (typeof directory == "string") {
		await fs.ensureFile(destination);
		await fs.writeFile(destination, directory);
		return;
	}

	await Promise.all(
		Object.entries(directory).map(([path, content]) =>
			writeFileSystem(content, join(destination, path)),
		),
	);
}
