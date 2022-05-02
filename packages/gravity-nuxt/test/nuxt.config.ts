import { fileURLToPath } from "url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default {
	alias: {
		"@digitak/gravity-nuxt": fileURLToPath(
			new URL("../source", import.meta.url),
		),
	},
};
