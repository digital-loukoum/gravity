import { defineApi } from "@digitak/gravity-svelte";
import type { services } from "../../../gravity/test/server/services/index";

export const { api, store } = defineApi<typeof services>({
	apiPath: "http://localhost:4000/api",
	cache: false,
	persist: true,
	network: "if-needed",
});
