import { compile, patch } from "@digitak/tsc-esm"
import { copyFileSync, rmSync } from "fs"

console.log("Cleaning package...")
rmSync("package", { recursive: true, force: true })

console.log("Compiling typescript...")
compile()

console.log("Patching imports...")
patch([{ find: /^@digitak\/bunker\/.*/, replacement: null }])

console.log("Copy './README.md'...")
copyFileSync("./README.md", "./package/README.md")

console.log("Copy './package.json'...")
copyFileSync("./package.json", "./package/package.json")
