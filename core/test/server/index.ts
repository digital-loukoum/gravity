import { defineHandler } from "../../source/node";
import { services } from "./services";
import { createServer } from "http";
import { print } from "@digitak/print";
import schema from "./schema.json";

const PORT = 4000;

const handler = defineHandler({
	services,
	schema,
	allowedOrigins: [],
	onRequestReceive() {
		return {};
	},
});

const server = createServer(handler);
server.listen(PORT);

print(`\n✨ [bold.magenta:Gravity server is running on port ${PORT}] ✨`);
