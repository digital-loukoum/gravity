import { prisma } from "../prisma"

export const userService = {
	...prisma.user,
	findAllUsers: async () => {
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
