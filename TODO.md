GENERAL

CLI

SVELTE / SVELTEKIT
- Test cookies
- Use bunker format instead of JSON to cache requests (more powerful)
- Replace `apiStore` by `store` and `useStore`
- SvelteKit SSR (use "loader" from "@digitak/gravity-svelte")

REACT
- React useApi()

SOLID
- Solid useApi()

NEXT
- Next SSR (use "loader" from "@digitak/gravity-next")

PRISMA
- Export BasePrismaService from @digitak/gravity-prisma
- Make prisma proxy options bet contextable (have context as argument)
- Remove $where and others
- Add "includable" to the prisma proxy options

DOCUMENTATION
- Add a section for reading and setting cookies
- Remove polling (bad practice)
- Add main page additional sections

FUTURE
- Download / upload
- UInt8Array, UInt16Array, UInt32Array, DataView, ArrayBuffer
- Allow to use message pack or a custom encoder
