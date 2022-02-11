import fs from "fs-extra";
import { print } from "@digitak/print";

export function bumpVersion() {
	const file = "package.json";
	const packageInfos = JSON.parse(fs.readFileSync(file, "utf8"));
	const version = packageInfos.version
		.split(".")
		.map((value: string) => +value);
	version[2]++;
	packageInfos.version = version.join(".");
	fs.writeFileSync(file, JSON.stringify(packageInfos, null, "\t"));

	const newVersion = version.join(".");
	print` New version is [bold:${newVersion}]\n`;

	return newVersion;
}
