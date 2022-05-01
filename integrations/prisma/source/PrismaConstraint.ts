import { PrismaInterface } from "./PrismaInterface.js";
import { PrismaSelect, PrismaSelectable, PrismaWhere } from "./PrismaTypes.js";

export type PrismaConstraint<EntityManager extends PrismaInterface<any>> = {
	/**
	 * Constraint on *where* parameter.
	 */
	where?: PrismaWhere<EntityManager>;

	/**
	 * Constraint on *select* and *include* parameters.
	 * If not defined, every field and relation is queryable.
	 */
	selectable?: PrismaSelectable<EntityManager>;

	/**
	 * Default selected values.
	 */
	select?: PrismaSelect<EntityManager>;

	/**
	 * Default included relations.
	 */
	include?: PrismaSelect<EntityManager>;
};

export type ContextualPrismaConstraint<
	EntityManager extends PrismaInterface<any>,
	Target = Record<never, never>,
> =
	| PrismaConstraint<EntityManager>
	| ((target: Target) => PrismaConstraint<EntityManager>);
