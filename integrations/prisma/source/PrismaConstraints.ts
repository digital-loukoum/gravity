import { PrismaInterface } from "./PrismaInterface";
import { PrismaProxyInterface } from "./PrismaProxyInterface";
import { PrismaSelect, PrismaSelectable, PrismaWhere } from "./PrismaTypes";

export type BasePrismaConstraints<EntityManager extends PrismaInterface> = {
	where?: PrismaWhere<EntityManager>;
	select?: PrismaSelect<EntityManager>;
	include?: PrismaSelect<EntityManager>;
	selectable?: PrismaSelectable<EntityManager>;
};

export type PrismaConstraints<Context, EntityManager extends PrismaInterface> =
	| BasePrismaConstraints<EntityManager>
	| ((context: Context) => BasePrismaConstraints<EntityManager>);
