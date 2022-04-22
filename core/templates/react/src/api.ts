import type { services } from "./services/index.js";
import { defineApi } from "@digitak/gravity-react";

export const { api, useApi } = defineApi<services>({
	// additional options go there
});
