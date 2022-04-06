GENERAL
- Methods that start with underscore should not be exposed
- Parameters validation
- lastRefreshAt should be reactive
- Replace `Swr` prefix by `UseApi`
- Use bunker format instead of JSON to cache requests (more powerful)
- Pass resolved response to onResponseReceive callback
- Create cookie parser that works with Node and browser
- Guards and tags should take a path as main argument
- Test guards with parameters
- Rename "middleware" to "handler"

SVELTE / SVELTEKIT
- SvelteKit SSR (use "loader" from "@digitak/gravity-svelte")

REACT

SOLID

NEXT
- Next SSR (use "loader" from "@digitak/gravity-next")

PRISMA
- Export BasePrismaService from @digitak/gravity-prisma
- Make prisma proxy options bet contextable (have context as argument)
- Remove $where and others
- Add "includable" to the prisma proxy options

