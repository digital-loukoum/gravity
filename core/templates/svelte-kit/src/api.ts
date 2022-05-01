import type { services } from "./services";
import { defineApi } from "@digitak/gravity-svelte-kit";

export const { api, useApi } = defineApi<typeof services>({
	apiPath: "/api",
	// ...additional options go there
});
