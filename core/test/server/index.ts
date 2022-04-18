import { defineHandler } from "../../source/node";
import { services } from "./services";
import { createServer } from "http";
import { print } from "@digitak/print";
import schema from "./schema.json";
import type { Context } from "./Context";
import { isPrivate } from "./guards/Private";
import { ServerError } from "../../source";

const PORT = 4000;

const handler = defineHandler<Context>({
	services,
	schema,
	allowedOrigins: [],
	onRequestReceive(request) {
		console.log("Receiving request", request);
		return {
			user: {
				isAdmin: false,
			},
		};
	},
	authorize({ service, path: [property] }) {
		if (isPrivate(service, property)) {
			throw new ServerError(`Forbidden access`);
		}
	},
	onResponseSend({ response }) {
		return response;
	},
});

const server = createServer(handler);
server.listen(PORT);

print(`\n✨ [bold.magenta:Gravity server is running on port ${PORT}] ✨`);
