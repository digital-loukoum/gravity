# gravity
Gravity is a full-stack framework that provides **end-to-end typesafe API** with an **enjoyable developer experience**.

> The projet is in active development. You can follow the [roadmap](#roadmap).

```ts
// server/services/users.ts

/**
 * We define a service "users" that we will expose to our client
 * The client will be able to invoke any of the public methods of the service
 */
export class users extends Service {
  getFullName(firstName = "", lastName = ""): string {
    if (!firstName) return lastName
    if (!lastName) return firstName
    return `${firstName} ${lastName}`
  }
}
```

```ts
// client/main.ts
import { api } from "../api"

/**
 * Client-side, all exposed services are available under the `api` object
 * Methods signatures are strictly identic server and client-side
 * The only difference is that client-side the return type of a service method will be promisified
 */
const fullName = await api.users.getFullName("Foo", "Bar")
console.log("Full name is:", fullName) // will print "Full name is: Foo Bar"
```

### Highlights

- **Types are shared** between client and server: no more unsafe REST or GraphQL code-generation.
- **Natural function invocation**: call your api functions as if it's *just a javascript function*. Gravity will handle all the server ↔ client communication for you.
- **Typescript-oriented**: just relax and enjoy type-safety and autocompletion on your api calls.
- **No schema declaration**: your Typescript types *are* your schema.
- **Simple authorization flow**: Gravity services implement a simple and enjoyable interface to make sure that anyone cannot do anything.
- **Modular and scalable architecture**: by working with *services*, you can be sure your code will remain well-organized even for the largest codebases.
- **Back-end agnostic**: you can use a vanilla node server or any back-end framework like Express, Polka, h3, Next, SvelteKit, etc...
- **Front-end agnostic**: use Gravity with Svelte, React, Vue, or any other front-end framework.
- **Client-side api composables**: built-in React or Svelte composables unlock powerful features like data caching and automatic polling.
- **Simple**: The same api written with Nest and GraphQL needs 3x more code. **Do in one day what you used to do in three days.**


Go to the documentation and [get started!](documentation)


## <a name="roadmap"></a> Roadmap

### Core features

✅ Server / client communication
✅ Context
✅ Use other services in service
✅ Low-level metadata API for services and operations
✅ Guard decorators
✅ Tag decorators
✅ Gravity callbacks (beforeRequestSend, afterRequestReceive, authorize, beforeResponseSend, afterResponseReceived)
✅ Error handling
🚧 Automatic schema generation
🚧 Parameters validation at runtime
🚧 Validation decorators

### Integrations

#### Back-end frameworks
✅ All frameworks with Express-like middlewares: Express, Polka, h3, Connect, ...
✅ SvelteKit
🚧 Vanilla Node server
🚧 Next.js
🚧 Nuxt

#### Front-end frameworks

✅ Svelte
🚧 React
🚧 Vue 3
