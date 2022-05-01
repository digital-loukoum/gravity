import type { services } from "/path/to/your/services";
import { defineApi } from "@digitak/gravity-svelte";

export const { api, useApi } = defineApi<typeof services>({
	// additional options go there
});
