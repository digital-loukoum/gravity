import type { NextApiRequest, NextApiResponse } from "next"
import { services } from "../../services"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const users = await services.users.findMany()
	res.status(200).json(users)
}
