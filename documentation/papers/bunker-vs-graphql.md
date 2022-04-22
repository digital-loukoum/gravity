# Bunker pros

- Bunker can work with Date object. GraphQL translates date objects to strings wich is very annoying
- GraphQL's number limit is `2 ** (32 - 1)` (32-bits integer). Bunker work with 64-bits floats and infinitely scalable `BigInt`
- Bunker can deal with union types
- No need to define custom scalar **ever**
