import { AnyPrismaInterface } from "./AnyPrismaInterface.js";
import { applyProxyOptions } from "./applyProxyOptions.js";
import { ContextualPrismaConstraint } from "./PrismaConstraint.js";

export const prismaProxy = <
	EntityManager extends AnyPrismaInterface,
	Constraints extends ContextualPrismaConstraint<EntityManager, Target>,
	Target = Record<never, never>,
>(
	entityManager: EntityManager,
	constraints?: Constraints,
) =>
	<Target & EntityManager>{
		aggregate(this: Target & EntityManager, options: any) {
			return entityManager.aggregate(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: ["_count", "_avg", "_sum", "_min", "_max"],
					},
				),
			);
		},
		count(this: Target & EntityManager, options: any) {
			return entityManager.count(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
		create(this: Target & EntityManager, options: any) {
			return entityManager.create(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{ select: true },
				),
			);
		},
		delete(this: Target & EntityManager, options: any) {
			return entityManager.delete(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
		deleteMany(this: Target & EntityManager, options: any) {
			return entityManager.deleteMany(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{ where: true },
				),
			);
		},
		findUnique(this: Target & EntityManager, options: any) {
			return entityManager.findFirst(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
		findMany(this: Target & EntityManager, options: any) {
			return entityManager.findMany(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
		findFirst(this: Target & EntityManager, options: any) {
			return entityManager.findFirst(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
		groupBy(this: Target & EntityManager, options: any) {
			return entityManager.groupBy(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: ["_count", "_avg", "_sum", "_min", "_max"],
					},
				),
			);
		},
		update(this: Target & EntityManager, options: any) {
			return entityManager.update(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
		updateMany(this: Target & EntityManager, options: any) {
			return entityManager.updateMany(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{ where: true },
				),
			);
		},
		upsert(this: Target & EntityManager, options: any) {
			return entityManager.upsert(
				applyProxyOptions<EntityManager, Constraints, Target>(
					options,
					this,
					constraints,
					{
						where: true,
						select: true,
					},
				),
			);
		},
	};
