import { compile, patch } from "@digitak/tsc-esm";
import fs from "fs-extra";

console.log("Cleaning package...");
fs.rmSync("package", { recursive: true, force: true });

console.log("Compiling typescript...");
compile();

console.log("Copying configuration files...");
fs.copyFileSync("./README.md", "./package/README.md");
fs.copyFileSync("./package.json", "./package/package.json");

console.log("Patching imports...");
patch();
