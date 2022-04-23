import { logger } from "../logs/logger.js";
import { normalizePath } from "../utilities/normalizePath.js";
import type { DefineHandlerOptions } from "./DefineHandlerOptions.js";

export function normalizeHandlerOptions<
	Options extends DefineHandlerOptions<any, any, any>,
>(options: Options) {
	const apiPath = (options.apiPath = normalizePath(options.apiPath ?? "/api"));
	logger.verbose = options.verbose ?? false;
	return { ...options, apiPath };
}
