import { prisma } from "../prisma"

export const users = {
	...prisma.user,
	findAll: async () => {
		console.log("Finding all users...")
		try {
			const users = await prisma.user.findMany({ include: { posts: true } })
			console.log("Found users:", users)
			return users
		} catch (error) {
			console.error("An error happened...", error)
			return []
		}
	},
}
