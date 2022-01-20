import type { BaseServiceConstructor } from "@digitak/gravity";
import { AssignPrototype } from "@digitak/gravity/utilities/AssignPrototype";
import { prismaProxy } from "./prismaProxy";

export function BasePrismaService<
	Context,
	ServiceConstructor extends BaseServiceConstructor<Context>,
>(serviceConstructor: ServiceConstructor) {
	return (entityManager: any) =>
		AssignPrototype(serviceConstructor, prismaProxy(entityManager));
}
