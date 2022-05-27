import { bytesToBase64 } from "byte-base64";

export function getCacheKey(
	service: string,
	target: string,
	body: null | Uint8Array,
): string {
	let key = `${service}/${target}`;
	if (body) key += "?" + bytesToBase64(body);
	return key;
}
