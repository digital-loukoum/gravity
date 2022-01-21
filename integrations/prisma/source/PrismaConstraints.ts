import { PrismaInterface } from "./PrismaInterface";
import { PrismaProxyInterface } from "./PrismaProxyInterface";
import { PrismaSelect, PrismaSelectable, PrismaWhere } from "./PrismaTypes";

export type PrismaConstraints<EntityManager extends PrismaInterface> = {
	where?: PrismaWhere<EntityManager>;
	select?: PrismaSelect<EntityManager>;
	include?: PrismaSelect<EntityManager>;
	selectable?: PrismaSelectable<EntityManager>;
};
