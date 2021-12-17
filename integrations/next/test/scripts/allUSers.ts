import PrismaClientPackage from "@prisma/client"
const { PrismaClient } = PrismaClientPackage

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
	const allUsers = await prisma.user.findMany({
		include: { posts: true },
	})
	// use `console.dir` to print nested objects
	console.dir(allUsers, { depth: null })
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
