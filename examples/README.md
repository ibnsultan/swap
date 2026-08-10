# Mifano ya Swap (Swap examples)

Programu fupi zinazoonyesha vipengele mbalimbali vya lugha ya Swap. Kila
faili ina ugani `.sw` na inaweza kuendeshwa moja kwa moja na `swap` CLI.

Endesha kutoka mzizi wa mradi (repo root), kwa mfano:

```sh
node cli.js examples/01_hello_world.sw
```

au, ikiwa `swapro` imesakinishwa kimataifa (`npm install -g swapro`):

```sh
swap examples/01_hello_world.sw
```

## Orodha ya mifano

| Faili | Kinachoonyeshwa |
|---|---|
| [01_hello_world.sw](01_hello_world.sw) | `andika` — kuchapisha kwenye console |
| [02_variables.sw](02_variables.sw) | `hifadhi` — kutunza vigeuzo na kuunganisha maneno (string concatenation) |
| [03_conditionals.sw](03_conditionals.sw) | `kama` / `basi kama` / `basi` — masharti |
| [04_loops.sw](04_loops.sw) | `wakati` na `hakika` — vitanzi (while / for) |
| [05_switch_case.sw](05_switch_case.sw) | `chagua` / `kesi` / `zaidi` — swahili switch/case |
| [06_functions.sw](06_functions.sw) | `njia`, `rejesha`, wigo wa vigeuzo (scope), na `ita` |
| [07_arrays.sw](07_arrays.sw) | oganizesheni za mstari mmoja na za ngazi nyingi (arrays) |
| [08_builtin_helpers.sw](08_builtin_helpers.sw) | `herufiKubwa`, `herufiNdogo`, `kaunta`, `hariri`, `tafuta`, `badili` |
| [09_user_input.sw](09_user_input.sw) | `dai` — kupokea maoni ya mtumiaji (inahitaji terminal halisi) |
| [10_imports/](10_imports/) | `lete` — kuleta faili nyingine ndani ya programu |

## Maelezo muhimu

- Njia (path) inayotumika na `lete` inasomwa kuanzia mahali unapoendesha
  amri ya `swap`, si mahali faili ya sasa ilipo — kwa hiyo mfano wa
  [10_imports/main.sw](10_imports/main.sw) lazima uendeshwe kutoka mzizi
  wa mradi.
- `chagua`/`kesi` husimama papo hapo baada ya `kesi` inayolingana
  kutekelezwa — neno `vunja` halihitajiki humo (tofauti na baadhi ya
  lugha nyingine).
