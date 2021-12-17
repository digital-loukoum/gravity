import { services } from "../../services"
import { gravity } from "@digitak/gravity/middleware/next"

export const config = {
	api: {
		bodyParser: false,
	},
}

export default gravity({ services })
