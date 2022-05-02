import { defineHandler } from "@digitak/gravity-svelte-kit/server";
import { services } from "./services/index.js";
import type { Context } from "./services/Context.js";
import schema from "./schema.json";

export const { handle } = defineHandler<Context>({
	apiPath: "/api",
	services,
	schema,
});
