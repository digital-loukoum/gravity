import { defineHandler } from "@digitak/gravity-nuxt/defineHandler";
import { Context } from "../Context";
import schema from "../schema.json";
import { services } from "../services";

export default defineHandler<Context>({
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
