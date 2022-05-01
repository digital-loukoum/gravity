import { defineHandler } from "@digitak/gravity-next/server";
import { Context } from "../server/Context";
import schema from "../server/schema.json";
import { services } from "../server/services";

export default defineHandler({
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
