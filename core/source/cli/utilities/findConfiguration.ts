import TOML from "@iarna/toml";
import { readFileSync } from "fs";
import { findClosestFile } from "./findClosestFile.js";

let configuration: undefined | null | Record<string, unknown> = undefined;

/**
 * Find the closest "gravity.toml" file and load it.
 */
export function findConfiguration(): Record<string, unknown> | null {
	if (configuration !== undefined) return configuration;
	const file = findClosestFile("gravity.toml");
	if (file) {
		return (configuration = TOML.parse(readFileSync(file, "utf8")));
	}
	return (configuration = null);
}
