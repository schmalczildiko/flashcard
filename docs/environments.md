# Környezetek és tesztkimenetek

Ez a doksi azt magyarázza, **hol fut** a teszt, **mit jelent a `list` reporter**, és **mi közös / mi külön** a te géped és az agent között.

---

## 1. Alapértelmezett reporter: `list` (terminál)

A `playwright.config.ts` szerint:

```ts
reporter: 'list',
```

Ha így futtatsz:

```powershell
npm.cmd run test:e2e
```

**nem** készül HTML oldal. A „lista” a **terminál kimenete**: `ok` / `x`, tesztnevek, végén `5 passed` / `8 failed`.

| Kérdés | Válasz |
| --- | --- |
| Hol érhető el? | Abban a terminálban, ahol a parancs futott (scrollback / terminal fájl a Cursorban) |
| Marad-e fájl belőle? | **Nem** — nincs `list-report.html`. Új terminál / bezárt session után csak akkor látod, ha a kimenet még megvan |
| Agent első futása ma | Ugyanez: `list` a terminálba írt; nem „bent ragadt” egy külön agent-riportmappában |

Ha böngészős összefoglalót akarsz: `--reporter=html` → lásd `docs/html-reporter.md`.

---

## 2. Mi kerül a projektmappába? (közös hely)

A workspace gyökere (ez a Spanish Flashcards projekt) **ugyanaz** a te Exploreredben és az agent számára. Ide íródhat:

| Mappa / fájl | Mi ez | Git? |
| --- | --- | --- |
| `playwright-report/` | HTML reporter kimenete | ignore-olva |
| `test-results/` | hibás tesztek mellékletei (pl. error context) | ignore-olva |

Ezek **nem** „agent-only” titkos tárhelyek: ha az agent vagy te a projektben futtatod a teszteket, ide írnak.  
Ha a másik fél később ugyanitt futtat, **felülírhatja** a legutóbbi riportot / results-t.

**Összefoglalva:** a riportfájlok alapból a **projekthez** kötődnek (ha létrejönnek), nem egy környezettől független globális Playwright-riportmappához. A `list` viszont egyáltalán nem fájl.

---

## 3. Két futtató környezet

### A) Te (Cursor terminál / helyi gép)

- Parancsok: `npm.cmd run …`, `npx.cmd …`
- Playwright böngészők tipikusan:  
  `C:\Users\Windows 10\AppData\Local\ms-playwright\`
- A terminál kimenetét te látod a panelen

### B) Agent (Cursor agent / sandbox)

- Az agent is a **projektmappában** dolgozik (ugyanazok a forrásfájlok)
- A Playwright **böngészőbinárisok** cache-e gyakran **külön** path:  
  `...\AppData\Local\Temp\cursor-sandbox-cache\...\playwright\`
- Ha ott nincs Chromium → `browserType.launch: Executable doesn't exist` — ez **nem** az app hibája
- A `list` kimenet az agent terminál logjába kerül (Cursor terminals), nem egy tartós „agent HTML lista” fájlba

```text
┌─────────────────────┐     ugyanaz a projekt      ┌─────────────────────┐
│  Te (terminál)      │◄──── src/, e2e/, docs/ ────►│  Agent (sandbox)    │
│  ms-playwright\     │     playwright-report/     │  sandbox-cache\…    │
│  (böngészők)        │     test-results/          │  (saját böngészők)  │
└─────────────────────┘                            └─────────────────────┘
         ▲                                                  ▲
         │              list → csak terminál                │
         └──────────────────────────────────────────────────┘
```

---

## 4. Gyors döntési tábla

| Amit keresel | Hol van |
| --- | --- |
| Passed/failed sorok a futás után | Terminál (`list`) |
| Böngészős összefoglaló | `playwright-report/` + `show-report` (`html`) |
| „Eltűnt a listám” | Nem fájl volt — a terminál history kell, vagy futtasd újra `--reporter=html`-lel |
| Böngésző hiányzik az agentnél | Sandbox cache; `npx.cmd playwright install` az agent futtatásakor |
| Böngésző hiányzik nálad | `ms-playwright`; nálad: `npx.cmd playwright install` |

---

## Kapcsolódó doksik

- `docs/html-reporter.md` — HTML riport generálás és megnyitás
- `docs/local-dev.md` — app helyi URL
- `docs/e2e-testing-principles.md` — tesztelési elvek
