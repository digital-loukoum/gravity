import dotenv from "dotenv";
dotenv.config();

import { prismaProxy } from "../source/prismaProxy";
import { BasePrismaService } from "../source/BasePrismaService";
import { BaseService, BaseServiceConstructor } from "@digitak/gravity";
import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

const proxy = prismaProxy(prisma.user);
proxy.$where = {
	email: {
		startsWith: "maria",
	},
};
proxy.$select = {
	email: true,
	posts: {
		distinct: "authorId",
	},
};
proxy.$include = {
	posts: {},
};
proxy.$selectable = {
	email: true,
	posts: {
		id: true,
	},
};

// A `main` function so that you can use async/await
async function main() {
	const allUsers = await proxy.findMany();
	// use `console.dir` to print nested objects
	console.dir(allUsers, { depth: null });
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
