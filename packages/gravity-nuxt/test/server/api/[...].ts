import { defineHandler } from "@digitak/gravity-nuxt/server";
import schema from "../schema.json";
import { services } from "../services";

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
