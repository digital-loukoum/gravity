import { defineApi } from "@digitak/gravity-vue";
import type { services } from "./server/services";

export const { api, store } = defineApi<typeof services>({
	apiPath: "/api",
});
