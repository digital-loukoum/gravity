import type { BaseService } from "../services/BaseService.js";

export type ServicesRecord<Context> = Record<
	string,
	new (context: Context) => BaseService<Context>
>;
