import fs from "fs";

export function getVersion(): string | undefined {
	const content = fs.readFileSync("package.json", "utf-8");
	const packageInfos = JSON.parse(content);
	return packageInfos.version;
}
