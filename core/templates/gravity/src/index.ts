import { createServer } from "http";
import { defineHandler } from "@digitak/gravity/node";
import { services } from "./services/index.js";
import type { Context } from "./services/Context.js";
import schema from "./schema.json";

const PORT = 3000;

const gravityHandler = defineHandler<Context>({
	apiPath: "/api",
	services,
	schema,
});

const server = createServer(gravityHandler);

server.listen(PORT, () => {
	console.log(`✨ Gravity server listening to port ${PORT}`);
});
