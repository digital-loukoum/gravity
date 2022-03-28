import { gravity } from "../../source/node";
import { services } from "./services";
import { createServer } from "http";
import { print } from "@digitak/print";

const PORT = 4000;

const handler = gravity({
	services,
	allowedOrigins: [],
	onRequestReceive() {
		return {};
	},
});

const server = createServer(handler);
server.listen(PORT);

print(`\n✨ [bold.magenta:Gravity server is running on port ${PORT}] ✨`);
