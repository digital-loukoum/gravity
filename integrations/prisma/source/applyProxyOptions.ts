import { merge } from "./merge";
import { narrow } from "./narrow";
import { PrismaInterface } from "./PrismaInterface";

export function applyProxyOptions(
	options: any,
	proxy: PrismaInterface,
	apply: { where?: boolean; select?: boolean | string[] },
) {
	options ??= {};

	if (options.include) {
		options.select = merge(options.select ?? {}, options.include);
		options.include = undefined;
	}

	if (apply.where && proxy.$where) {
		options.where = proxy.$where;
	}

	if (apply.select === true && proxy.$select) {
		options.select = merge(options.select ?? {}, proxy.$select);
	}

	if (apply.select === true && proxy.$include) {
		options.select = merge(options.select ?? {}, proxy.$include);
	}

	if (apply.select === true && proxy.$selectable) {
		if (options.select) {
			options.select = narrow(options.select, proxy.$selectable);
		}
	} else if (Array.isArray(apply.select)) {
		for (const key of apply.select) {
			if (options[key]) options[key] = narrow(options[key], proxy.$selectable);
		}
	}

	console.log("options", options);
	throw "STOP";
	return options;
}
