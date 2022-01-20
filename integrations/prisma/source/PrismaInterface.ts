import { PrismaProxyInterface } from "./PrismaProxyInterface";

export type PrismaInterface = {
	[Key in keyof PrismaProxyInterface<unknown>]: any;
};
