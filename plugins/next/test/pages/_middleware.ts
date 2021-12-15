import { prisma } from "../prisma"
import type { NextFetchEvent, NextRequest } from "next/server"

export default async function (request: NextRequest, event: NextFetchEvent) {
	// const allUsers = await prisma.user.findMany({
	// 	include: { posts: true },
	// })
	// return new Response(JSON.stringify(allUsers))
}
