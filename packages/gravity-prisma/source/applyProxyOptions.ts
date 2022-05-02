import { merge } from "./merge.js";
import { narrow } from "./narrow.js";
import {
	PrismaConstraint,
	ContextualPrismaConstraint,
} from "./PrismaConstraint.js";
import { PrismaInterface } from "./PrismaInterface.js";

export function applyProxyOptions<
	EntityManager extends PrismaInterface<any>,
	Constraints extends ContextualPrismaConstraint<EntityManager, Target>,
	Target = Record<never, never>,
>(
	options: any,
	proxy: EntityManager & Target,
	constraints: undefined | Constraints,
	apply: { where?: boolean; select?: boolean | string[] },
) {
	options ??= {};

	const {
		where,
		include,
		select,
		selectable,
	}: PrismaConstraint<EntityManager> =
		(typeof constraints == "function" ? constraints(proxy) : constraints) ?? {};

	if (options.include) {
		options.select = merge(
			options.include,
			options.select ?? options.selectable ?? {},
		);
		options.include = undefined;
	}

	if (where && apply.where) {
		options.where = where;
	}

	if (select && apply.select === true) {
		options.select = merge(
			select as any,
			options.select ?? options.selectable ?? {},
		);
	}

	if (include && apply.select === true) {
		options.select = merge(
			include as any,
			options.select ?? options.selectable ?? {},
		);
	}

	if (selectable) {
		if (apply.select === true) {
			if (options.select) {
				options.select = narrow(options.select, selectable as any);
			}
		} else if (Array.isArray(apply.select)) {
			for (const key of apply.select) {
				if (options[key])
					options[key] = narrow(options[key], selectable as any);
			}
		}
	}

	return options;
}
