export const templates = {
	gravity: {
		"index.ts":
			'import { createServer } from "http";\nimport { defineHandler } from "@digitak/gravity/node";\nimport { services } from "./services.js";\nimport schema from "./schema.json.js";\n\nconst PORT = 3000;\n\nconst gravityHandler = defineHandler({\n\tapiPath: "/api",\n\tservices,\n\tschema,\n});\n\nconst server = createServer(gravityHandler);\n\nserver.listen(PORT, () => {\n\tconsole.log(`✨ Gravity server listening to port ${PORT}`);\n});\n',
	},
	react: {
		"api.ts":
			'import type { services } from "./services.js";\nimport { defineApi } from "@digitak/gravity-react";\n\nexport const { api, useApi } = defineApi<services>({\n\t// additional options go there\n});\n',
	},
	server: {
		"schema.json": "{}\n",
		services: {
			"Context.ts": "export type Context = undefined;\n",
			"Service.ts":
				'import { BaseService } from "@digitak/gravity";\nimport { Context } from "./Context.js";\n\nexport class Service extends BaseService<Context> {}\n',
			"index.ts":
				'import { math } from "./math/index.js";\n\nexport const services = {\n\tmath,\n};\n',
			math: {
				"index.ts":
					'import { Service } from "../Service.js";\n\n/**\n * This is a sample service\n */\nexport class math extends Service {\n\tadd(x: number, y: number): number {\n\t\treturn x + y;\n\t}\n\n\tsubtract(x: number, y: number): number {\n\t\treturn x - y;\n\t}\n}\n',
			},
		},
	},
	solid: {},
	svelte: {
		src: {
			"api.ts":
				'import type { services } from "./services.js";\nimport { defineApi } from "@digitak/gravity-svelte";\n\nexport const { api, useApi } = defineApi<services>({\n\t// additional options go there\n});\n',
		},
	},
	"svelte-kit": {
		src: {},
	},
	vue: {
		"api.ts":
			'import type { services } from "./services.js";\nimport { defineApi } from "@digitak/gravity-vue";\n\nexport const { api, useApi } = defineApi<services>({\n\t// additional options go there\n});\n',
	},
};
