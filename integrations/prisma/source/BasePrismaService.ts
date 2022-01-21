import { BaseService, BaseServiceConstructor } from "@digitak/gravity";
import { Assign } from "@digitak/gravity/utilities/Assign";
import { PrismaInterface } from "./PrismaInterface";
import { prismaProxy } from "./prismaProxy";
import { PrismaProxyInterface } from "./PrismaProxyInterface";

export function BasePrismaService<
	Context,
	ServiceConstructor extends BaseServiceConstructor<Context>,
>(serviceConstructor: ServiceConstructor) {
	return <EntityManager extends PrismaInterface>(
		entityManager: EntityManager,
	): new (
		...args: ConstructorParameters<ServiceConstructor>
	) => InstanceType<ServiceConstructor> &
		PrismaProxyInterface<typeof entityManager> =>
		Assign(serviceConstructor, prismaProxy(entityManager));
}
