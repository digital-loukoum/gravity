import type { ServerResponse } from "http";
import { serializeCookie } from "./serializeCookie.js";
import type { Cookie } from "./Cookie.js";

/**
 * Set an object of cookies to a response object.
 */
export function setCookies<ResponseType extends Response | ServerResponse>(
	response: ResponseType,
	cookies: Record<string, Cookie>,
) {
	const cookiesValue = Object.entries(cookies).map(([name, cookie]) =>
		serializeCookie(
			name,
			typeof cookie == "string" ? cookie : cookie.value,
			typeof cookie == "string" ? {} : cookie,
		),
	);

	if ("setHeader" in response) {
		if (!cookiesValue.length) return
		response.setHeader("Set-Cookie", cookiesValue);
	} else {
		cookiesValue.forEach((cookie) =>
			response.headers.append("Set-Cookie", cookie),
		);
	}
}
