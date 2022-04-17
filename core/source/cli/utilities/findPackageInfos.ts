import fs from "fs";

let packageInfos: undefined | null | Record<string, unknown> = undefined;

export function findPackageInfos(): Record<string, unknown> | null {
	if (packageInfos !== undefined) return packageInfos;

	for (const path of [
		"package.json",
		"../package.json",
		"../../package.json",
	]) {
		try {
			return (packageInfos = JSON.parse(fs.readFileSync(path, "utf8")));
		} catch (e) {
			// ignore
		}
	}
	return (packageInfos = null);
}
