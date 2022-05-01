import { defineApi } from "@digitak/gravity-nuxt";
import type { services } from "./services";

export const { api, store } = defineApi<typeof services>({
	apiPath: "/api",
	// ...additional options go there
});
