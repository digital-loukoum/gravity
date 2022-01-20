import { compile, patch } from "@digitak/tsc-esm";
import { copyFileSync, rmSync, readFileSync, writeFileSync } from "fs";

console.log("Cleaning package...");
rmSync("package", { recursive: true, force: true });

console.log("Compiling typescript...");
compile();

console.log("Copying configuration files...")
copyFileSync("./README.md", "./package/README.md")

const jsonPackage = JSON.parse(readFileSync("package.json", "utf8"))
for (const option of ["dependencies", "devDependencies", "peerDependencies"]) {
	for (const key in jsonPackage[option]) {
		if (jsonPackage[option][key].startsWith("../")) {
			jsonPackage[option][key] = "*"
		}
	}
}
writeFileSync("package/package.json", JSON.stringify(jsonPackage, null, "\t"))

console.log("Patching imports...");
patch();
