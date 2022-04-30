GENERAL

SVELTEKIT
Move defineHandler import in `server.ts` instead of `index.ts` (dont mix client and server code)

PRISMA
- Export BasePrismaService from @digitak/gravity-prisma
- Make prisma proxy options bet contextable (have context as argument)
- Remove $where and others
- Add "includable" to the prisma proxy options

SSR
- SvelteKit SSR (useServices from defineHandler + loader from defineApi)
- Next SSR (useServices from defineHandler)
- Nuxt SSR (loader proxy from defineApi with base64 encoding as key)

DOCUMENTATION


@NEXT
- Download / upload

@FUTURE
- UInt8Array, UInt16Array, UInt32Array, DataView, ArrayBuffer; a way to pass binary data
- Use typeName + id to detect unique objects
- Allow to use message pack or a custom encoder
