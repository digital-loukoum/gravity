import { bunker } from "@digitak/bunker";

export function encodeProperties(
	properties: string[] | null | undefined,
): Uint8Array | null {
	if (!properties?.length) return null;
	return bunker(properties);
}
