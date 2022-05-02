import { defineApi } from "@digitak/gravity-react";
import type { services } from "../../../../core/test/server/services/index";

export const { api, store } = defineApi<typeof services>({
	apiPath: "http://localhost:4000/api",
});
