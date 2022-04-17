import { spawn } from "child_process";
import { api } from "./api";

const server = spawn(`npm`, ["run", "test:server"]);

const serverIsReady = new Promise((resolve) => {
	server.stdout.on("data", (data) => {
		console.log(data.toString());
		if (data.toString().includes("Gravity server is running")) {
			resolve(undefined);
		}
	});
});

// start("gravity/core", async ({ stage, same, test }) => {
// await serverIsReady;

// console.log("server is ready =)");
// const result = await api.math.add(3, 4);
// console.log("Addition result:", result);

// server.kill();
// });

const test = async () => {
	await serverIsReady;

	console.log("server is ready =)");
	const result = await api.math.add(3, 4);
	console.log("Addition result:", result);
};

test();
