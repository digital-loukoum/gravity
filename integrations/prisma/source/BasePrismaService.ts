import { BaseServiceConstructor } from "@digitak/gravity";
import { Assign } from "@digitak/gravity/utilities/Assign";
import { PrismaConstraints } from "./PrismaConstraints";
import { PrismaInterface } from "./PrismaInterface";
import { prismaProxy } from "./prismaProxy";

export function BasePrismaService<
	Context,
	ServiceConstructor extends BaseServiceConstructor<Context>,
>(serviceConstructor: ServiceConstructor) {
	return <EntityManager extends PrismaInterface>(
		entityManager: EntityManager,
		constraints?: PrismaConstraints<Context, EntityManager>,
	) => {
		return Assign(serviceConstructor, prismaProxy(entityManager, constraints));
	};
}
