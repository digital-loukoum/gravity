import { patchLocalDependencies } from "../../../scripts/utilities/patchLocalDependencies";
import fs from "fs-extra";

console.log("Cleaning package...");
fs.rmSync("package", { recursive: true, force: true });

console.log("Moving sources...");
fs.copySync("source", "package");

console.log("Making binaries executable...");
fs.chmodSync("./package/bin.js", 0o755);

console.log("Copying configuration files...");
fs.copyFileSync("./README.md", "./package/README.md");
patchLocalDependencies();

console.log("✨ Build done");
