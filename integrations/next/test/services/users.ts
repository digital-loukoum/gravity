import { prisma } from "../prisma";

export const users = {
	...prisma.user,
	findAll: async () => {
		try {
			const users = await prisma.user.findMany({ include: { posts: true } });
			return users;
		} catch (error) {
			return [];
		}
	},
};
