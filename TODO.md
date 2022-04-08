GENERAL
- Methods that start with underscore should not be exposed
- simple `api` requests should return a { data, error } object
- Pass resolved response to onResponseReceive callback
- Create cookie parser that works with Node and browser
- Guards and tags should take a path as main argument
- Test guards with parameters
- Export "useServices"

CLI
- gravity create
- gravity dev
- gravity build
- gravity preview
- Parameters validation

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
- Add "Gravity as middleware" section

FUTURE
- Download / upload