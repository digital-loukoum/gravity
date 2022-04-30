import { merge } from "./merge";
import { narrow } from "./narrow";
import { PrismaInterface } from "./PrismaInterface";

export function applyProxyOptions(
	options: any,
	proxy: PrismaInterface,
	apply: { where?: boolean; select?: boolean | string[] },
) {
	options ??= {};

	const $where = proxy?.$where?.();
	const $select = proxy?.$select?.();
	const $selectable = proxy?.$selectable?.();
	const $include = proxy?.$include?.();

	if (options.include) {
		options.select = merge(
			options.include,
			options.select ?? options.selectable ?? {},
		);
		options.include = undefined;
	}

	if ($where && apply.where) {
		options.where = $where;
	}

	if ($select && apply.select === true) {
		options.select = merge($select, options.select ?? options.selectable ?? {});
	}

	if ($include && apply.select === true) {
		options.select = merge(
			$include,
			options.select ?? options.selectable ?? {},
		);
	}

	if ($selectable) {
		if (apply.select === true) {
			if (options.select) {
				options.select = narrow(options.select, $selectable);
			}
		} else if (Array.isArray(apply.select)) {
			for (const key of apply.select) {
				if (options[key]) options[key] = narrow(options[key], $selectable);
			}
		}
	}

	// console.log("options", options);
	// throw "STOP"
	return options;
}
