import { PrismaInterface } from "./PrismaInterface.js";

export type AnyPrismaInterface<EntityManager = any> = {
	[Key in keyof PrismaInterface<EntityManager>]: any;
};
