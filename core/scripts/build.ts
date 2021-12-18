import { compile, patch } from "@digitak/tsc-esm"
import { copyFileSync, rmSync } from "fs"

console.log("Cleaning package...")
rmSync("package", { recursive: true, force: true })

console.log("Compiling typescript...")
compile()

console.log("Copying configuration files...")
copyFileSync("./README.md", "./package/README.md")
copyFileSync("./package.json", "./package/package.json")

console.log("Patching imports...")
patch()
