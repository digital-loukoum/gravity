import fs from "fs-extra";
import { open } from "fs/promises";
import { join } from "path";

type FileSystemEntity = FileSystemFile | FileSystemDirectory;
type FileSystemFile = string;
type FileSystemDirectory = { [Key: string]: FileSystemEntity };

/**
 * Read a file system entity.
 * If path does not exist, return undefined.
 * If path is a file, return the file contents as string.
 * If path is a directory, return an object with directory's contents.
 */
export async function readFileSystem(
	path: string,
): Promise<FileSystemEntity | undefined> {
	if (!fs.existsSync(path)) return undefined;
	if (fs.statSync(path).isDirectory()) {
		const directory: FileSystemDirectory = {};
		for (const file of fs.readdirSync(path)) {
			const content = await readFileSystem(join(path, file));
			if (content) directory[file] = content;
		}
		return directory;
	} else {
		const file = await open(path, "r");
		const content = await file.readFile("utf-8");
		file.close();
		return content;
	}
}
