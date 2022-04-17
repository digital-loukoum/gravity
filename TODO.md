GENERAL
- Create cookie parser that works with Node and browser
- Guards and tags should take a path as main argument
- Test guards with parameters

CLI
- gravity create
- Parameters validation
- Gravity version is based on cwd package.json ^^'

SVELTE / SVELTEKIT
- Use bunker format instead of JSON to cache requests (more powerful)
- Replace `Swr` prefix by `UseApi`
- lastRefreshAt should be reactive
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
- Add cli configuration section
- Set default entry file to src/index.ts

FUTURE
- Download / upload
- UInt8Array, UInt16Array, UInt32Array, DataView, ArrayBuffer
- Allow to use message pack or a custom encoder
