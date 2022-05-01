import { execSync } from "child_process";
import fs from "fs-extra";
import { patchLocalDependencies } from "../../../scripts/utilities/patchLocalDependencies";

console.log("Cleaning package...");
fs.rmSync("package", { recursive: true, force: true });

console.log("Compiling typescript...");
execSync("tsc", { stdio: "inherit" });

console.log("Copying configuration files...");
fs.copyFileSync("./README.md", "./package/README.md");
patchLocalDependencies();

console.log("✨ Build done");
