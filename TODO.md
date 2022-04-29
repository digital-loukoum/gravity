GENERAL
- Make CI/CD work again with framework integrations (bugs with tsc)

SVELTE / SVELTEKIT
- SvelteKit SSR (use "loader" from "@digitak/gravity-svelte")

NEXT
- Next handler
- Next SSR (use "loader" from "@digitak/gravity-next")

NUXT
- Nuxt handler
- Nuxt SSR (use "loader" from "@digitak/gravity-next")

PRISMA
- Export BasePrismaService from @digitak/gravity-prisma
- Make prisma proxy options bet contextable (have context as argument)
- Remove $where and others
- Add "includable" to the prisma proxy options

DOCUMENTATION
- Next installation
- Next server-side rendering
- Nuxt installation
- Nuxt server-side rendering

FUTURE
- Use typeName + id to detect unique objects
- Download / upload
- UInt8Array, UInt16Array, UInt32Array, DataView, ArrayBuffer
- Allow to use message pack or a custom encoder
