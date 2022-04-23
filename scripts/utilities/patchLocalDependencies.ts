import fs from "fs";

export function patchLocalDependencies() {
	const jsonPackage = JSON.parse(fs.readFileSync("package.json", "utf8"));
	for (const option of [
		"dependencies",
		"devDependencies",
		"peerDependencies",
	]) {
		for (const key in jsonPackage[option]) {
			if (jsonPackage[option][key].startsWith("link:")) {
				jsonPackage[option][key] = String(jsonPackage.version ?? "*");
			}
		}
	}
	fs.writeFileSync(
		"package/package.json",
		JSON.stringify(jsonPackage, null, "\t"),
	);
}
