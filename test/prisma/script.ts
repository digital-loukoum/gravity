import prismaPackage from "@prisma/client"
const { PrismaClient } = prismaPackage

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
	// ... you will write your Prisma Client queries here
	const allUsers = await prisma.user.findMany({
		include: {
			posts: true,
		},
	})
	console.dir(allUsers, { depth: null })
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
