# Gravity

**Gravity** is a full-stack framework that provides **end-to-end typesafe API** with an **enjoyable developer experience**.

> This projet is in active development. The documentation is incomplete, some features and integrations are still missing and it is highly discouraged to use it in production.
  If you are interested about the project's development, you can follow the [roadmap](#roadmap).

### Highlights

- **Types are shared** between client and server: no more unsafe REST or GraphQL code-generation.
- **Natural function invocation**: call your api functions as if it's _just a javascript function_. Gravity will handle all the server ↔ client communication for you.
- **Typescript-oriented**: just relax and enjoy type-safety and autocompletion on your api calls.
- **No schema declaration**: your Typescript types _are_ your schema.
- **Simple authorization flow**: Gravity services implement a simple and enjoyable interface to make sure that anyone cannot do anything.
- **Modular and scalable architecture**: by working with _services_, you can be sure your code will remain well-organized even for the largest codebases.
- **Back-end agnostic**: you can use a vanilla node server or any back-end framework like Express, Polka, h3, Next, SvelteKit, etc...
- **Front-end agnostic**: use Gravity with Svelte, React, Vue, or any other front-end framework.
- **Client-side api composables**: built-in React or Svelte composables unlock powerful features like data caching and automatic polling.
- **Simple**: The same api written with Nest and GraphQL needs 3x more code. **Do in one day what you used to do in three days.**

<!-- Go to the documentation and [get started!](documentation) -->

### Simple example of back ↔ front communication with Gravity

Gravity is meant to be super-easy and intuitive to use. Here is a simple demonstration of how you can call a server function from your client:
```ts
// [back]
// server/services/users.ts

/**
 * We define a service "users" that we will expose to our client
 * The client will be able to invoke any of the public methods of the service
 */
export class users extends Service {
  getFullName(firstName = "", lastName = ""): string {
    if (!firstName) return lastName;
    if (!lastName) return firstName;
    return `${firstName} ${lastName}`;
  }
}
```

```ts
// [front]
// client/main.ts

import { api } from "../api";

/**
 * Client-side, all exposed services are available under the `api` object
 * Methods signatures are strictly identic server and client-side
 * The only difference is that client-side the return type of a service method will be promisified
 */
const fullName = await api.users.getFullName("Foo", "Bar");
console.log("Full name is:", fullName); // will print "Full name is: Foo Bar"
```


# Installation

You can use Gravity in two ways:

- either as a backend frameworks that exposes a REST api from your typescript functions,
- or as a full-stack RPC framework with isomorphic capacities: call safely your server functions directly from your front.

Gravity is awesome when combined with an ORM like Prisma or MikroORM.

## Installation on the server

If you want to connect Gravity to your existing backend framework, you must follow the instructions from the given package.

### Native Node server

It is recommended to use a vanilla node server instead of a framework like Express, Polka or Fastify. Gravity already comes with its own way of dealing with routing. And the fastest backend framework is pure vanilla 😉

Install the core package:

```
npm install @digitak/gravity
```

Then add this code to your entry file:

```ts
// source/index.ts
import { createServer } from "http"
import { gravity } from "@digitak/gravity/node"
import { services } from "the/path/to/your/services"

const PORT = 3000

const server = createServer(
  gravity({
    apiPath: "/api",
    services,
  }),
);

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
```

#### How to run and build my project?

If you need simple and modern development tools to write your Gravity project in Typescript, first install:

```shell
npm install --save-dev esbuild @digitak/esrun
```

Then add the following scripts to your package.json:

```json
  "scripts": {
    "dev": "esrun --watch ./source/index.ts",
    "build": "esbuild ./source/index.ts --outfile=./build/index.js --platform=node --bundle --minify",
    "check": "tsc --noEmit",
    "preview": "node ./build/index.js",
  }
```

> ⚠️ &nbsp; Some old CommonJS packages may cause bugs when used in dev mode

### Express-like server (Express, Polka, h3, Connect, etc...)

Install the core package:

```
npm install @digitak/gravity
```

Then add this code to your entry file:

```ts
import express from "express"
import { gravity } from "@digitak/gravity/middleware"
import { services } from "the/path/to/your/services"

const PORT = 3000

const app = express() // depends on the framework you are using

app.use(gravity({
  apiPath: "/api",
  services
}))

app.listen(PORT, () => {
  console.log("Listening to port", PORT)
})
```


### SvelteKit server

Install the Svelte integration of Gravity:

```
npm install @digitak/gravity-svelte
```

Then create a `src/hooks.ts` file if it does not already exist:

```ts
// src/hooks.ts
import { gravity } from "@digitak/svelte-gravity"
import { services } from "the/path/to/your/services"

export const handle = gravity({
  apiPath: "/api",
  services,
});
```

If you need to setup multiple hooks, use the [SvelteKit's built-in sequence function](https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks).

### Next.js server

Not done yet. Submit a pull request if you want to use Gravity with Next.js.

### Nuxt server

Not done yet. Submit a pull request if you want to use Gravity with Next.js.

## Installation on the client

On the client-side, Gravity handles:

- automatic access with correct typing to the server functions,
- automatic caching of server calls to avoid repetitive calls by using a [stale-while-revalidate](https://www.infoq.com/news/2020/11/ux-stale-while-revalidate/) strategy.

You will need to install the gravity integration corresponding to your front-end framwork.

### Svelte

To use Gravity with Svelte, install the Svelte integration of Gravity:

```
npm install @digitak/gravity-svelte
```

Then create a `api.ts` file somewehere in your codebase:

```ts
// src/api.ts
import { defineApi } from "@digitak/gravity-svelte"

// do not forget the keyword "type" here; you only want to load type informations
import type { services } from "path/to/my/services"

export const { api, useApi } = defineApi<typeof services>({
  apiPath: "/api",
})
```

### React

Not done yet. Submit a pull request if you want to use Gravity with React.

### Vue

Not done yet. Submit a pull request if you want to use Gravity with Vue.


# Basic usage



# <a name="roadmap"></a> Roadmap

### Core features

<table>
  <tr>
    <td>✅</td>
    <td>Server / client communication</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Context</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Use other services in service</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Low-level metadata API for services and operations</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Guard decorators</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Tag decorators</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Gravity callbacks</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Error handling</td>
  </tr>
  <tr>
    <td>🚧</td>
    <td>Automatic schema generation</td>
  </tr>
  
  <tr>
    <td>🚧</td>
    <td>Parameters validation at runtime</td>
  </tr>
  
  <tr>
    <td>🚧</td>
    <td>Validation decorators</td>
</tr>

  </tr>
</table>


### Integrations

#### Back-end frameworks

<table>
  <tr>
    <td>✅</td>
    <td>Express, Polka, h3, Connect, and similar</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>SvelteKit</td>
  </tr>
  <tr>
    <td>✅</td>
    <td>Vanilla Node server</td>
  </tr>
  <tr>
    <td>❌</td>
    <td>Next.js</td>
  </tr>
  <tr>
    <td>❌</td>
    <td>Nuxt</td>
  </tr>
</table>

#### Front-end frameworks
<table>
  <tr>
    <td>✅</td>
    <td>Svelte</td>
  </tr>
  <tr>
    <td>❌</td>
    <td>React</td>
  </tr>
  <tr>
    <td>❌</td>
    <td>Vue 3</td>
  </tr>
</table>

#### ORMs
<table>
  <tr>
    <td>🚧</td>
    <td>Prisma</td>
  </tr>
  <tr>
    <td>❌</td>
    <td>MikroOrm</td>
  </tr>
  <tr>
    <td>❌</td>
    <td>Vue 3</td>
  </tr>
</table>
