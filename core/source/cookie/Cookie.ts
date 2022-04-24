import type { SerializeCookieOptions } from "./serializeCookie.js";

export type Cookie =
	| string
	| ({
			value: string;
	  } & SerializeCookieOptions);
