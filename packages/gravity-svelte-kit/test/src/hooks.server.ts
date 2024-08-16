import { defineHandler } from "../../source/defineHandler";
import { services } from "./gravity/services/index";

export const { handle } = defineHandler({
	apiPath: "/api",
	services,
	schema: {},
	onRequestReceive: ({ request }) => {
		console.log("Request received:", request.url);
		return {
			user: "toto",
		};
	},
	// additional options go there
});
