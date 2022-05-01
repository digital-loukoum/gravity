import { BaseServiceConstructor } from "@digitak/gravity";
import { Assign } from "@digitak/gravity/utilities/Assign";
import { ContextualPrismaConstraint } from "./PrismaConstraint.js";
import { PrismaInterface } from "./PrismaInterface.js";
import { prismaProxy } from "./prismaProxy.js";

export function BasePrismaService<
	ServiceConstructor extends BaseServiceConstructor<any>,
>(serviceConstructor: ServiceConstructor) {
	return <
		EntityManager extends PrismaInterface<any>,
		Constraints extends ContextualPrismaConstraint<
			EntityManager,
			InstanceType<ServiceConstructor>
		>,
	>(
		entityManager: EntityManager,
		constraints?: Constraints,
	) => {
		return Assign(
			serviceConstructor,
			prismaProxy<EntityManager, Constraints, InstanceType<ServiceConstructor>>(
				entityManager,
				constraints,
			),
		);
	};
}
