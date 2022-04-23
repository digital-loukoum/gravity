export const templates = {
  "gravity": {
    "gravity.toml": "servicesFile = \"src/services/index.ts\"\nschemaFile = \"src/schema.json\"\nentryFile = \"src/index.ts\"\noutputFile = \"build/index.js\"\n",
    "src": {
      "index.ts": "import { createServer } from \"http\";\nimport { defineHandler } from \"@digitak/gravity/node\";\nimport { services } from \"./services/index.js\";\nimport type { Context } from \"./services/Context.js\";\nimport schema from \"./schema.json\";\n\nconst PORT = 3000;\n\nconst gravityHandler = defineHandler<Context>({\n\tapiPath: \"/api\",\n\tservices,\n\tschema,\n});\n\nconst server = createServer(gravityHandler);\n\nserver.listen(PORT, () => {\n\tconsole.log(`✨ Gravity server listening to port ${PORT}`);\n});\n"
    }
  },
  "next": {},
  "nuxt": {},
  "react": {
    "src": {
      "api.ts": "import type { services } from \"./services/index.js\";\nimport { defineApi } from \"@digitak/gravity-react\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  },
  "server": {
    "src": {
      "schema.json": "{}\n",
      "services": {
        "Context.ts": "export type Context = undefined;\n",
        "Service.ts": "import { BaseService } from \"@digitak/gravity\";\nimport type { Context } from \"./Context.js\";\n\nexport class Service extends BaseService<Context> {}\n",
        "index.ts": "import { math } from \"./math/index.js\";\n\nexport const services = {\n\tmath,\n};\n",
        "math": {
          "index.ts": "import { Service } from \"../Service.js\";\n\n/**\n * This is a sample service\n */\nexport class math extends Service {\n\tadd(x: number, y: number): number {\n\t\treturn x + y;\n\t}\n\n\tsubtract(x: number, y: number): number {\n\t\treturn x - y;\n\t}\n}\n"
        }
      }
    }
  },
  "solid": {
    "src": {
      "api.ts": "import type { services } from \"./services/index.js\";\nimport { defineApi } from \"@digitak/gravity-solid\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  },
  "svelte": {
    "src": {
      "api.ts": "import type { services } from \"./services/index.js\";\nimport { defineApi } from \"@digitak/gravity-svelte\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  },
  "svelte-kit": {
    "gravity.toml": "servicesFile = \"src/services/index.ts\"\nschemaFile = \"src/schema.json\"\n",
    "src": {
      "hooks.ts": "import { defineHandler } from \"@digitak/gravity-svelte\";\nimport { services } from \"./services/index.js\";\nimport type { Context } from \"./services/Context.js\";\nimport schema from \"./schema.json\";\n\nconst gravityHandler = defineHandler<Context>({\n\tapiPath: \"/api\",\n\tservices,\n\tschema,\n});\n\nexport const handle = gravityHandler;\n"
    }
  },
  "vue": {
    "src": {
      "api.ts": "import type { services } from \"./services/index.js\";\nimport { defineApi } from \"@digitak/gravity-vue\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  }
};
