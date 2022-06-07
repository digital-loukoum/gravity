import { defineHandler } from "@digitak/gravity-next/server";
import schema from "../../server/schema.json";
import { services } from "../../server/services";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const config = {
	api: {
		bodyParser: false,
	},
};

const { handler } = defineHandler({
	schema,
	services,
	async onRequestReceive({ request }) {
		console.log("Received request", request.method, request.url);
		await sleep(500);
		return {
			user: {
				isAdmin: false,
			},
		};
	},
});

export default handler;
