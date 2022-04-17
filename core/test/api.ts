import "./fetch.polyfill.js";
import { defineApi } from "../source/api/defineApi.js";
import type { services } from "./server/services";

export const { api } = defineApi<typeof services>({
	apiPath: "http://localhost:4000/api",
	onRequestSend(request) {
		console.log("Send request");
		return request;
	},
	onResponseReceive(response, data) {
		console.log("Receive response");
	},
});
