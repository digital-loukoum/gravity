<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async (options) => {
		const version = await (await options.fetch('/version')).text();
		return {
			props: { version }
		};
	};
</script>


<script lang="ts">
	import MainSection from 'src/components/MainSection.svelte';

	export let version: string
</script>

<MainSection/>

:::section type="info"

## Simple workflow

:::steps

!!!step title="Create a new service"|orientation="vertical"

And define some functions.

```ts
import { Service } from "./Service.js"

export class math extends Service {
	add(a: number, b: number) {
		return a + b
	}

	subtract(a: number, b: number) {
		return a + b
	}
}
```
!!!

!!!step title="Export your service to your clients"|orientation="vertical"

All services in the `services` object will be exposed.

```ts
import { math } from "./math.js"

export const services = {
	math,
}
```
!!!

!!!step title="Call your server functions from your client"|orientation="vertical"

Use the `api` proxy to access all your exported services **from your client**.

```ts
import { api } from "./api.js"

const { data, error } = await api.math.add(4, 2)

if (error) {
	console.log("Error:", error)
} else {
	console.log(data) // should print '6'
}
```
!!!

!!!step title="And let Gravity handle the rest"|orientation="vertical"

Sit back and congrats yourself.

You just defined a new server method and used it from your client.
!!!
:::



:::section type="tip"
## End-to-end type safety

:::steps

!!!step title="Share your types between server and client"|orientation="vertical"
Stay **dry** and reuse **the same types** from your server and your client.

The [api](/docs/usage/use-a-service#api) and the [store](/docs/usage/use-a-service#store) proxy both preserve your services types.
!!!

!!!step title="No wrong types from the client"|orientation="vertical"
Gravity **parses** your source code and **extract** the types of your services.

The resulting types is then generated into a [schema file](/docs/project-structure/schema) that is used by Gravity to validate every client call.
!!!

:::

:::section type="note"
## First-class Prisma integration

:::steps

!!!step title="Create services that extend your Prisma models"|orientation="vertical"

The `user` service will automatically extend all [Prisma methods](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique).

```ts
import { PrismaService } from './PrismaService';

export class user extends PrismaService(prisma.user) {}
```
!!!

!!!step title="Use your Prisma services from your client"|orientation="vertical"
You can access `user` like any other service via the [api proxy](/docs/usage/use-a-service#api).

```ts
import { api } from "./api.js"

const onClick = async () => {
	await api.user.update({
		where: {
			id: "my-unique-id",
		},
		data: {
			firstName: "Foo",
		},
	})
}
```
!!!

!!!step title="Define your access controls in a declarative way"|orientation="vertical"
**Describe** your access control rules at **service-level**.

Never let a user **read** or **update** data he has **no relation with**.

```ts
import { PrismaService } from './PrismaService';

export class user extends PrismaService(prisma.user, context => ({
	where: {
		id: {
			in: [
				context.user.id,
				...context.user.friendIds
			]
		}
	}
})) {
	// ...your other custom methods here
}
```

!!!


:::


<Signature {version} />
