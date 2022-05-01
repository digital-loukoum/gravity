import { defineHandler } from "@digitak/gravity-next/server";
import schema from "../../server/schema.json";
import { services } from "../../server/services";

export const config = {
	api: {
		bodyParser: false,
	},
};

const { handler } = defineHandler({
	schema,
	services,
});

export default handler;
