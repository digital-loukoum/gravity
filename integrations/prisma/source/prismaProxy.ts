import { applyProxyOptions } from "./applyProxyOptions";
import { PrismaConstraints } from "./PrismaConstraints";
import { PrismaInterface } from "./PrismaInterface";
import { PrismaProxyInterface } from "./PrismaProxyInterface";

// type UserWhere = Where<UserDelegate>;

export const prismaProxy = <Context, EntityManager extends PrismaInterface>(
	entityManager: EntityManager,
	constraints?: PrismaConstraints<Context, EntityManager>,
): PrismaProxyInterface<EntityManager> =>
	<PrismaInterface>{
		$where: () => constraints?.where,
		$select: () => constraints?.select,
		$include: () => constraints?.include,
		$selectable: () => constraints?.selectable,

		aggregate(options: any) {
			return entityManager.aggregate(
				applyProxyOptions(options, this, {
					where: true,
					select: ["_count", "_avg", "_sum", "_min", "_max"],
				}),
			);
		},
		count(options: any) {
			return entityManager.count(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
		create(options: any) {
			return entityManager.create(
				applyProxyOptions(options, this, { select: true }),
			);
		},
		delete(options: any) {
			return entityManager.delete(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
		deleteMany(options: any) {
			return entityManager.deleteMany(
				applyProxyOptions(options, this, { where: true }),
			);
		},
		findUnique(options: any) {
			return entityManager.findFirst(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
		findMany(options: any) {
			return entityManager.findMany(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
		findFirst(options: any) {
			return entityManager.findFirst(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
		groupBy(options: any) {
			return entityManager.groupBy(
				applyProxyOptions(options, this, {
					where: true,
					select: ["_count", "_avg", "_sum", "_min", "_max"],
				}),
			);
		},
		update(options: any) {
			return entityManager.update(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
		updateMany(options: any) {
			return entityManager.updateMany(
				applyProxyOptions(options, this, { where: true }),
			);
		},
		upsert(options: any) {
			return entityManager.upsert(
				applyProxyOptions(options, this, { where: true, select: true }),
			);
		},
	};
