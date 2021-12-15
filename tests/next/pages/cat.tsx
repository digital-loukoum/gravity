import { PrismaClient, User } from "@prisma/client"
import { useState } from "react"
import { api } from "../api"

export default function Cat() {
	const [meow, setMeow] = useState('')
	const [users, setUsers] = useState<User[]>([])
	
	api.cat.meow("Coco").then(setMeow)
	// api.userService.findAllUsers().then(response => {
	// 	console.log("users", response)
	// 	setUsers(response)
	// })

	return <div>
		Hey!
		<p>Meow? {meow}</p>
		<p>How many users? {users.length}</p>
		{/* {users.map(user => <p key={user.id}>Hey!</p>)} */}
	</div>
}

export async function getServerSideProps() {
	const prisma = new PrismaClient()
	const users = await prisma.user.findMany()
	console.log("users", users)
	return { props: { users }}
 }
