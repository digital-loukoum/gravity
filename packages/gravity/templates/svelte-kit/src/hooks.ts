import { defineHandler } from "@digitak/gravity-svelte-kit/server";
import { services } from "./services/index.js";
import schema from "./schema.json";

export const { handle } = defineHandler({
	apiPath: "/api",
	services,
	schema,
});
