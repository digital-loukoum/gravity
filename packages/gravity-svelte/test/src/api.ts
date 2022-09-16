import { defineApi } from "@digitak/gravity-svelte";
import type { services } from "../../../gravity/test/server/services/index";

export const { api, store } = defineApi<typeof services>({
	apiPath: "http://localhost:4000/api",
	cache: true,
	persist: false,
	network: "if-needed",
	identify: true,
	onRequestSend: async ({ request }) => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		return request;
	},
});
