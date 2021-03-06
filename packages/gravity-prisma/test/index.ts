import dotenv from "dotenv";
dotenv.config();

import { prismaProxy } from "../source/prismaProxy";
import { BasePrismaService } from "../source/BasePrismaService";
import { BaseService, BaseServiceConstructor } from "@digitak/gravity";
import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

class Service extends BaseService<number> {}
class user extends BasePrismaService(Service)(prisma.user, ({ context }) => ({
	selectable: {
		posts: {
			authorId: true,
			author: {
				email: true,
			},
		},
	},
})) {}

const proxy = prismaProxy(prisma.user, {
	where: {},
	select: {
		id: true,
		email: true,
	},
	include: {
		posts: true,
	},
	selectable: {
		id: true,
		email: true,
		posts: {
			id: true,
			title: true,
		},
	},
});

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
