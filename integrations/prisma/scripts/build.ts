import { execSync } from "child_process";
import fs from "fs-extra";

console.log("Cleaning package...");
fs.rmSync("package", { recursive: true, force: true });

console.log("Compiling typescript...");
execSync("tsc");

console.log("Copying configuration files...");
fs.copyFileSync("./README.md", "./package/README.md");

const jsonPackage = JSON.parse(fs.readFileSync("package.json", "utf8"));
for (const option of ["dependencies", "devDependencies", "peerDependencies"]) {
	for (const key in jsonPackage[option]) {
		if (jsonPackage[option][key].startsWith("../")) {
			jsonPackage[option][key] = "*";
		}
	}
}
fs.writeFileSync(
	"package/package.json",
	JSON.stringify(jsonPackage, null, "\t"),
);
