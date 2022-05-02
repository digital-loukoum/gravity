import { PrismaEntityProperty } from "./PrismaTypes.js";

export type PrismaInterface<EntityManager> = {
	aggregate: PrismaEntityProperty<EntityManager, "aggregate">;
	count: PrismaEntityProperty<EntityManager, "count">;
	create: PrismaEntityProperty<EntityManager, "create">;
	delete: PrismaEntityProperty<EntityManager, "delete">;
	deleteMany: PrismaEntityProperty<EntityManager, "deleteMany">;
	findUnique: PrismaEntityProperty<EntityManager, "findUnique">;
	findMany: PrismaEntityProperty<EntityManager, "findMany">;
	findFirst: PrismaEntityProperty<EntityManager, "findFirst">;
	groupBy: PrismaEntityProperty<EntityManager, "groupBy">;
	update: PrismaEntityProperty<EntityManager, "update">;
	updateMany: PrismaEntityProperty<EntityManager, "updateMany">;
	upsert: PrismaEntityProperty<EntityManager, "upsert">;
};
