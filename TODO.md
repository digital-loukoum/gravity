GENERAL

CLI
- add gravity.toml in templates
- Gravity version is based on cwd package.json ^^'

SVELTE / SVELTEKIT
- Test cookies
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
- Documentation for nested values
- Add cli configuration section (in project structure > gravity.toml)
- Set default entry file to src/index.ts
- Add a section for reading and setting cookies

FUTURE
- Download / upload
- UInt8Array, UInt16Array, UInt32Array, DataView, ArrayBuffer
- Allow to use message pack or a custom encoder
- Protect non-service methods with guards (use a getter)
