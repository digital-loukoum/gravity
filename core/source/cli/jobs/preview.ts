import { GravityCliOptions } from "../GravityCliOptions";
import fs from "fs-extra";
import print from "@digitak/print";
import { execSync } from "child_process";

export type GravityPreviewOptions = Pick<GravityCliOptions, "outputFile">;

export async function preview({
	outputFile = "dist/index.js",
}: GravityPreviewOptions = {}) {
	if (!fs.existsSync(outputFile)) {
		print.error`\n  ❌ [white: Could not entry file [bold:'${outputFile}']]\n`;
		return;
	}

	execSync(`node ${outputFile}`);
}
