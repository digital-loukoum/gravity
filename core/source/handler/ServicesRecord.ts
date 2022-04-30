import type { BaseServiceConstructor } from "../index.js";

export type ServicesRecord<Context> = Record<
	string,
	new (context: Context) => { context: Context }
>;
