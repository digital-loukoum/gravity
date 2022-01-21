import { PrismaProxyInterface } from "./PrismaProxyInterface";

export type PrismaInterface<EntityManager = any> = {
	[Key in keyof PrismaProxyInterface<EntityManager>]: any;
};
