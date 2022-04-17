import type { GravityCliOptions } from "../GravityCliOptions.js";
import fs from "fs-extra";
import print from "@digitak/print";
import { execSync } from "child_process";
import { resolveCliOptions } from "../utilities/resolveCliOptions.js";

export type GravityPreviewOptions = Pick<GravityCliOptions, "outputFile">;

export async function preview(options: GravityPreviewOptions = {}) {
	const { outputFile } = resolveCliOptions(options);

	if (!fs.existsSync(outputFile)) {
		print.error`\n  ❌ [white: Could not find output file [bold:'${outputFile}']]\n`;
		return;
	}

	execSync(`node ${outputFile}`);
}
