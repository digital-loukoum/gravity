import type { SerializeCookieOptions } from "./serializeCookie.js";

export type Cookie = {
	value: string;
} & SerializeCookieOptions;
