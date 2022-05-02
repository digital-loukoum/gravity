function decode(value: string) {
	return value.indexOf("%") !== -1 ? decodeURIComponent(value) : value;
}

/**
 * Parse the given cookie header string into an object.
 */
export function parseCookies(
	rawCookies: string,
	options: ParseCookiesOptions = {},
): Record<string, string> {
	const cookies: Record<string, string> = {};
	const decoder = options.decode ?? decode;

	const safeDecode = (value: string): string => {
		try {
			return decoder(value);
		} catch (error) {
			return value;
		}
	};

	for (let index = 0; index < rawCookies.length; index++) {
		const equalIndex = rawCookies.indexOf("=", index);
		if (equalIndex === -1) break;

		let stopIndex = rawCookies.indexOf(";", index);
		if (stopIndex === -1) stopIndex = rawCookies.length;
		else if (stopIndex < equalIndex) {
			// backtrack on prior semicolon
			index = rawCookies.lastIndexOf(";", equalIndex - 1) + 1;
			continue;
		}

		const key = rawCookies.slice(index, equalIndex).trim();
		if (cookies[key] === undefined) {
			let value = rawCookies.slice(equalIndex + 1, stopIndex).trim();

			// quoted values
			if (value.charCodeAt(0) === 0x22) {
				value = value.slice(1, -1);
			}

			cookies[key] = safeDecode(value);
		}

		index = stopIndex + 1;
	}

	return cookies;
}

export interface ParseCookiesOptions {
	/**
	 * Specifies a function that will be used to decode a cookie's value. Since
	 * the value of a cookie has a limited character set (and must be a simple
	 * string), this function can be used to decode a previously-encoded cookie
	 * value into a JavaScript string or other object.
	 *
	 * The default function is the global `decodeURIComponent`, which will decode
	 * any URL-encoded sequences into their byte representations.
	 *
	 * *Note* if an error is thrown from this function, the original, non-decoded
	 * cookie value will be returned as the cookie's value.
	 */
	decode?(value: string): string;
}
