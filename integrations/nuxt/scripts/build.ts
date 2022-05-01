import { execSync } from "child_process";
import { patchLocalDependencies } from "../../../scripts/utilities/patchLocalDependencies";
import fs from "fs-extra";

console.log("Cleaning package...");
fs.rmSync("package", { recursive: true, force: true });

console.log("Compiling typescript...");
execSync("tsc", { stdio: "inherit" });

console.log("Copying configuration files...");
fs.copyFileSync("./README.md", "./package/README.md");
patchLocalDependencies();

console.log("✨ Build done");
