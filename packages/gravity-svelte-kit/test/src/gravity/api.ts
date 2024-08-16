import { defineApi } from "../../../source";
import type { services } from "./services/index.js";

export const { api, store, useStore } = defineApi<typeof services>({
	apiPath: "api",
	persist: true,
	cache: false,
	network: "if-needed",
});
