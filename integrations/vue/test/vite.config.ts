import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"src/": `${__dirname}/src/`,
			"@digitak/gravity-vue": `${__dirname}/../source`,
		},
	},
});
