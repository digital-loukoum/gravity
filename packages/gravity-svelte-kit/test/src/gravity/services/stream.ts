import { Service } from "../Service";
import { GravityStream } from "@digitak/gravity";

export class stream extends Service {
	ping = (to: string) => {
		console.log("Start pinging to", to);
		return new GravityStream<string>((stream) => {
			const interval = setInterval(() => {
				console.log("Sending ping to", to);
				stream.send("Ping 3 to " + to);
				stream.send("Ping 4 to " + to);
			}, 1000);
			setTimeout(() => {
				console.log("Stop sending ping to", to);
				clearInterval(interval);
				stream.close();
			}, 5000);
		});
	};
}
