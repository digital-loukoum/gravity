export const templates = {
  "gravity": {
    "gravity.toml": "servicesFile = \"src/services/index.ts\"\nschemaFile = \"src/schema.json\"\nentryFile = \"src/index.ts\"\noutputFile = \"build/index.js\"\n",
    "src": {
      "index.ts": "import { createServer } from \"http\";\nimport { defineHandler } from \"@digitak/gravity/node\";\nimport { services } from \"./services/index.js\";\nimport schema from \"./schema.json\";\n\nconst PORT = 3000;\n\nconst { handler } = defineHandler({\n\tapiPath: \"/api\",\n\tservices,\n\tschema,\n});\n\nconst server = createServer(handler);\n\nserver.listen(PORT, () => {\n\tconsole.log(`✨ Gravity server listening to port ${PORT}`);\n});\n",
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
  "next": {
    "gravity.toml": "schemaFile = \"server/schema.json\"\nservicesFile = \"server/services/index.ts\"\n",
    "pages": {
      "api": {
        "[...].ts": "import { defineHandler } from \"@digitak/gravity-next/server\";\nimport schema from \"../../server/schema.json\";\nimport { services } from \"../../server/services\";\n\nexport const config = {\n\tapi: {\n\t\tbodyParser: false,\n\t},\n};\n\nconst { handler } = defineHandler({\n\tschema,\n\tservices,\n});\n\nexport default handler;\n"
      }
    },
    "server": {
      "Context.ts": "export type Context = undefined;\n",
      "Service.ts": "import { BaseService } from \"@digitak/gravity\";\nimport { Context } from \"./Context\";\n\nexport class Service extends BaseService<Context> {}\n",
      "api.ts": "import { defineApi } from \"@digitak/gravity-next\";\nimport type { services } from \"./services\";\n\nexport const { api, store } = defineApi<typeof services>({\n\tapiPath: \"http://localhost:3000/api\",\n\t// ...additional options go there\n});\n",
      "schema.json": "{}",
      "services": {
        "index.ts": "import { math } from \"./math\";\n\nexport const services = {\n\tmath,\n};\n",
        "math.ts": "import { Service } from \"../Service\";\n\nexport class math extends Service {\n\tadd(x: number, y: number) {\n\t\treturn x + y;\n\t}\n\n\tsubtract(x: number, y: number) {\n\t\treturn x - y;\n\t}\n}\n"
      }
    }
  },
  "nuxt": {
    "gravity.toml": "servicesFile = \"server/services/index.ts\"\nschemaFile = \"server/schema.json\"\n",
    "server": {
      "Context.ts": "export type Context = undefined;\n",
      "Service.ts": "import type { Context } from \"./Context\";\nimport { BaseService } from \"@digitak/gravity\";\n\nexport class Service extends BaseService<Context> {}\n",
      "api": {
        "[...].ts": "import { defineHandler } from \"@digitak/gravity-nuxt/server\";\nimport schema from \"../schema.json\";\nimport { services } from \"../services\";\n\nconst { handler } = defineHandler({\n\tschema,\n\tservices,\n});\n\nexport default handler;\n"
      },
      "api.ts": "import { defineApi } from \"@digitak/gravity-nuxt\";\nimport type { services } from \"./services\";\n\nexport const { api, store } = defineApi<typeof services>({\n\tapiPath: \"/api\",\n\t// ...additional options go there\n});\n",
      "schema.json": "{}",
      "services": {
        "index.ts": "import { math } from \"./math\";\n\nexport const services = {\n\tmath,\n};\n",
        "math.ts": "import { Service } from \"../Service\";\n\nexport class math extends Service {\n\tadd(x: number, y: number) {\n\t\treturn x + y;\n\t}\n\n\tsubtract(x: number, y: number) {\n\t\treturn x - y;\n\t}\n}\n"
      }
    }
  },
  "react": {
    "src": {
      "api.ts": "import type { services } from \"/path/to/your/services\";\nimport { defineApi } from \"@digitak/gravity-react\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  },
  "solid": {
    "src": {
      "api.ts": "import type { services } from \"/path/to/your/services\";\nimport { defineApi } from \"@digitak/gravity-solid\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  },
  "svelte": {
    "src": {
      "api.ts": "import type { services } from \"/path/to/your/services\";\nimport { defineApi } from \"@digitak/gravity-svelte\";\n\nexport const { api, store } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  },
  "svelte-kit": {
    "gravity.toml": "servicesFile = \"src/services/index.ts\"\nschemaFile = \"src/schema.json\"\n",
    "src": {
      "api.ts": "import type { services } from \"./services\";\nimport { defineApi } from \"@digitak/gravity-svelte-kit\";\n\nexport const { api, store } = defineApi<typeof services>({\n\tapiPath: \"/api\",\n\t// ...additional options go there\n});\n",
      "hooks.ts": "import { defineHandler } from \"@digitak/gravity-svelte-kit/server\";\nimport { services } from \"./services/index.js\";\nimport schema from \"./schema.json\";\n\nexport const { handle } = defineHandler({\n\tapiPath: \"/api\",\n\tservices,\n\tschema,\n});\n",
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
  "vue": {
    "src": {
      "api.ts": "import type { services } from \"/path/to/your/services\";\nimport { defineApi } from \"@digitak/gravity-vue\";\n\nexport const { api, useApi } = defineApi<typeof services>({\n\t// additional options go there\n});\n"
    }
  }
};
