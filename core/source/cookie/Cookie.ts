import type { CookieSerializeOptions } from "cookie";

export type Cookie = {
	value: string;
} & CookieSerializeOptions;
