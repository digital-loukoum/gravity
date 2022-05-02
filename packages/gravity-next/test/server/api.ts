import { defineApi } from "@digitak/gravity-next";
import type { services } from "./services/index";

export const { api, store } = defineApi<typeof services>({
	apiPath: "http://localhost:3000/api",
});
