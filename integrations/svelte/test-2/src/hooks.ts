import { defineHandler } from "@digitak/gravity-svelte";
import { services } from "./services/index.js";
import type { Context } from "./services/Context.js";
import schema from "./schema.json";

const gravityHandler = defineHandler<Context>({
	apiPath: "/api",
	services,
	schema,
});

export const handle = gravityHandler;
