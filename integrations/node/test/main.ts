import { createServer } from "http";
import { defineHandler } from "@digitak/gravity/node";
import { services } from "./services";
import schema from "./schema.json";

const PORT = 3000;

const handler = defineHandler({
	apiPath: "/",
	services,
	schema,
	onRequestReceive(request) {
		console.log("Received request:", request);
	},
});

const server = createServer(handler);

server.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
