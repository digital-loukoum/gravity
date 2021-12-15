import { services } from "../../services"
import { gravity } from "@digitak/gravity/library/middleware/next"

export const config = {
	api: {
		bodyParser: false,
	},
}

export default gravity({ services })
