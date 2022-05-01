import YAML from "js-yaml";
import fs from "fs";

export type Workspace = {
	packages: string[];
};

export const workspace = <Workspace>(
	YAML.load(fs.readFileSync("pnpm-workspace.yaml", "utf8"))
);

export const { packages } = workspace;
