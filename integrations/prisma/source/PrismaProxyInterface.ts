import {
	PrismaInclude,
	PrismaSelect,
	PrismaSelectable,
	PrismaWhere,
	PrismeEntityProperty,
} from "./PrismaTypes";

export type PrismaProxyInterface<EntityManager> = {
	/**
	 * Restriction on *where* clauses.
	 * Applied to every call in addition to other parameters.
	 */
	$where?: () => PrismaWhere<EntityManager>;

	/**
	 * Restriction on *select* clauses.
	 * A user cannot select fields that are not in $selectable.
	 */
	$selectable?: () => PrismaSelectable<EntityManager>;

	/**
	 * Default selected fields.
	 */
	$select?: () => PrismaSelect<EntityManager>;

	/**
	 * Default included fields.
	 */
	$include?: () => PrismaInclude<EntityManager>;

	aggregate: PrismeEntityProperty<EntityManager, "aggregate">;
	count: PrismeEntityProperty<EntityManager, "count">;
	create: PrismeEntityProperty<EntityManager, "create">;
	delete: PrismeEntityProperty<EntityManager, "delete">;
	deleteMany: PrismeEntityProperty<EntityManager, "deleteMany">;
	findUnique: PrismeEntityProperty<EntityManager, "findUnique">;
	findMany: PrismeEntityProperty<EntityManager, "findMany">;
	findFirst: PrismeEntityProperty<EntityManager, "findFirst">;
	groupBy: PrismeEntityProperty<EntityManager, "groupBy">;
	update: PrismeEntityProperty<EntityManager, "update">;
	updateMany: PrismeEntityProperty<EntityManager, "updateMany">;
	upsert: PrismeEntityProperty<EntityManager, "upsert">;
};
