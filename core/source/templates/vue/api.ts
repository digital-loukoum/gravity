import type { services } from "./services";
import { defineApi } from "@digitak/gravity-vue";

export const { api, useApi } = defineApi<services>({
	// additional options go there
});
