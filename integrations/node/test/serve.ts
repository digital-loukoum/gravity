import { createServer } from "http";
import { gravity } from "@digitak/gravity/node";
import { services } from "./services";

const PORT = 3000;

const server = createServer(
	gravity({
		services,
		onRequestReceive(request) {
			// console.log("Received request:", request);
		},
	}),
);
server.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
