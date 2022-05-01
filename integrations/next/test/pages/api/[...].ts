import { defineHandler } from "@digitak/gravity-next/server";
import schema from "../../server/schema.json";
import { services } from "../../server/services";

export const config = {
	api: {
		bodyParser: false,
	},
};

const { handler } = defineHandler({
	schema,
	services,
	onRequestReceive({ request }) {
		console.log("Received request", request.method, request.url);
		return {
			user: {
				isAdmin: false,
			},
		};
	},
});

export default handler;
