import { defineHandler } from "@digitak/gravity-nuxt/server";
import schema from "../schema.json";
import { services } from "../services";

const { handler } = defineHandler({
	schema,
	services,
});

export default handler;
