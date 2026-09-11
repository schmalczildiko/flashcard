# E2E tesztelési elvek (Playwright)

Ez a dokumentum a Spanish Flashcards app kapcsán alkalmazott — és általában hasonló front-end tanulóappoknál ajánlott — end-to-end (E2E) tesztelési elveket gyűjti össze.

**Fontos:** ez nem egy lezárt, „egyetlen helyes” lista. A korábban említett 8 pont a *kiindulás*; alább azok részletesebb magyarázata, plusz további gyakori best practice-ek. A projekt méretétől, csapattól és CI-igénytől függően érdemes válogatni.

A konkrét tesztek helye: `e2e/`. Futtatás: `npm.cmd run test:e2e`.

---

## 1. User journey a UI-n

**Mit jelent:** az E2E teszt azt modellezi, amit a felhasználó a böngészőben csinál: navigál, kattint, olvas szöveget, kitölt mezőket.

**Miért:** ha csak belső függvényeket hívnál, nem derülne ki, hogy a gomb rossz route-ra mutat, vagy hogy egy szöveg nem látszik.

**Példa nálunk:** Home → Study Mode → Animals → flashcard. Ez végigmegy a valódi linkeken és oldalakon.

**Mit ne keverj bele:** az E2E nem helyettesíti a unit teszteket (pl. egy `pickRandom` segédfüggvény logikája).

---

## 2. Egy teszt ≈ egy (vagy kevés, összefüggő) viselkedés

**Mit jelent:** egy teszt főként *egy* kérdést válaszoljon meg: „Megjelennek-e a Right/Wrong gombok flip után?” — ne egyszerre a home-ot, a quizt és a statisztikát is.

**Miért:** ha elbukik, azonnal látod, *melyik* viselkedés romlott el. Egy 40 lépéses teszt bukásánál sokat kell nyomozni.

**Gyakorlati tipp:** több `expect` egy teszten belül rendben van, ha ugyanahhoz a kis forgatókönyvhöz tartoznak (pl. Card 2 + spanyol oldal + nincs Right gomb).

---

## 3. Determinisztikus mag + opcionális véletlen

**Mit jelent:**
- **Determinisztikus:** minden futtatáskor ugyanaz a bemenet és az elvárt kimenet (pl. mindig Animals, mindig Right).
- **Véletlen:** pl. random kategória vagy Right/Wrong — hasznos *kiegészítés*, de nem az egyetlen lefedés.

**Miért:** CI-ben és tanulás közben kell tudni reprodukálni a hibát. A tiszta random nem garantálja, hogy mindkét ág (Right és Wrong) minden éjszakai futtatáson lefut.

**Nálunk:** fix Right / fix Wrong / teljes Animals deck tesztek = mag. A random tesztek = extra variáció.

---

## 4. Függetlenség (tesztek ne függjenek egymástól)

**Mit jelent:** bármelyik teszt futtatható önmagában, tetszőleges sorrendben. Nem támaszkodik arra, hogy „az előző teszt már megnyitotta az Animals oldalt”.

**Miért:** a Playwright párhuzamosan futtathat workeröket; a sorrend nem garantált.

**Hogyan:** `beforeEach`-ben vagy a teszt elején `page.goto(...)`, saját állapot indítása. Kerüld a „globális” böngészőállapotot tesztek között (kivéve tudatos fixture-öket).

---

## 5. Stabil, szándékos selektorok (hozzáférhetőség alapján)

**Mit jelent:** inkább `getByRole`, `getByLabel`, `getByText` — olyan, amit a felhasználó / screen reader is „lát” — mint törékeny CSS osztály (`.card_abc123`) vagy mély DOM-út.

**Miért:** a stílusrefaktor gyakran törné a CSS-alapú teszteket, miközben a gomb szövege / `aria-label` változatlan marad.

**Nálunk:** a flashcard `aria-label`-je (`Spanish: el gato. Click to flip.`) kifejezetten segíti a stabil keresést.

---

## 6. Edge case-ek: UI-n túl (pl. rossz URL)

**Mit jelent:** nem minden hiba a „kattintós” boldog útvonalon van. Pl. a user beírhatja: `/study/not-a-category`.

**Miért:** a kategórialista nem engedi a rossz kattintást, de a címsor / könyvjelző / megosztott link igen. Az appnak ilyenkor is kiszámíthatóan kell viselkednie (nálunk: redirect a kategóriaválasztóra).

**Tanulság:** E2E = UI journey **és** fontos „nem UI-ról indított” belépési pontok.

---

## 7. Rövid tesztek vs. hosszú journey

**Mit jelent:**
- **Rövid:** egy átmenet (flip → gombok; Right → következő kártya).
- **Journey / smoke:** hosszabb út (teljes kategória végig → end screen → másik mód).

**Miért:** a rövid tesztek gyorsak és pontosak. A hosszúak jól mutatják, hogy „összerakva is működik az app”, de lassabbak és törékenyebbek.

**Best practice:** *kevés* hosszú journey + *sok* rövid, célzott teszt. Nem kell minden kombinációt E2E-ben végigjátszani.

---

## 8. Az acceptance criteria-hoz igazítás

**Mit jelent:** a `TODO.md` / specifikáció elfogadási kritériumai jó checklist a tesztekhez („gombok csak flip után”, „kattintás után következő kártya”).

**Miért:** így a teszt dokumentálja is a követelményt, nem csak „valami random UI-t” ellenőriz.

---

# További ajánlott elvek

Ezek nem voltak a rövid 8 pontos listában, de ugyanilyen jellegű appoknál érdemes ismerni őket.

## 9. Tesztpiramis — mit tegyél E2E-be?

Az E2E a piramis *teteje*: drágább (lassabb, több infrastruktúra). Alatta:
- **Unit:** tiszta logika (pl. kategória szűrés, pontszám számítás).
- **Komponens / integráció:** egy React komponens + props.

**Elv:** E2E-be azt tedd, ami *összerakva* számít (routing, lapok közti flow, böngészőben látható állapot). Ne írj E2E-t minden `if`-re.

## 10. Arrange – Act – Assert (elrendezés – cselekvés – ellenőrzés)

Tipikus szerkezet egy teszten belül:
1. **Arrange:** nyisd meg az oldalt, készítsd elő az állapotot.
2. **Act:** kattints / írj be szöveget.
3. **Assert:** `expect(...)`.

Így olvashatóbb a teszt, és elkerülöd a „közben is assertelgetek összevissza” káoszt.

## 11. Playwright auto-wait — ne használj felesleges `sleep`-et

A Playwright beépítetten vár, amíg az elem kattintható / látható. Kerüld a `waitForTimeout(2000)` jellegű várakozást, hacsak nincs nagyon indokolt ok.

**Miért:** a fix sleep lassú *és* flaky (néha kevés, néha túl sok).

## 12. Tiszta, ismert tesztadat

A flashcardok statikus fájlból jönnek (`src/data/flashcards.ts`). A tesztek erre támaszkodnak (pl. Animals első kártya: `el gato`).

**Elv:** ha változik az adat, frissítsd a tesztet — vagy a teszt olvassa ugyanazt a data modult (nálunk a random kategóriás teszt így van összekötve). Kerüld a „remélem a szerver most is ezt adja” bizonytalanságot.

## 13. Véletlen kontrollálása, ha kell

Tanuló / exploratív célra a `Math.random()` rendben van. Szigorú CI-hez gyakran:
- seedelt random, vagy
- `test.describe.configure` / külön projekt a random teszteknek, vagy
- a kritikus ágak **mindig** determinisztikusan is lefedve maradnak (nálunk ez a preferált út).

## 14. Hibakeresés: trace, headed, HTML report

Ha elbukik egy teszt:
- `--headed` — látod a böngészőt,
- `test:e2e:ui` — Playwright UI,
- `--reporter=html` + `npx.cmd playwright show-report` — összefoglaló,
- trace / screenshot a config szerint (`trace: 'on-first-retry'`).

**Elv:** a tesztinfrastruktúra része a „miért halt el” megértése is.

## 15. Ne a implementációt, hanem a szerződést tedd

Teszteld: „a user látja az angol fordítást flip után”.  
Ne tedd: „a `flipped` state `true` a React state-ben” (ehhez unit/komponens teszt illik, ha egyáltalán).

Így a belső refaktor (pl. state áthelyezése) kevésbé töri az E2E-t.

## 16. Flaky tesztek kezelése

Ha egy teszt „néha piros”:
1. ne takard el vak `retry`-jal hosszú távon,
2. keresd a valódi okot (versenyhelyzet, animáció, nem várt navigáció),
3. erősítsd a assertiont / várd meg a megfelelő UI állapotot.

A flip animáció nálunk CSS-es; a Playwright a DOM/accessibility állapotra támaszkodik, nem a vizuális középső kockára — ez általában stabilabb.

## 17. Párhuzamosság és izoláció a böngészőben

Minden teszt saját context/page-et kap. Ne osszatok meg cookie-t / `localStorage`-t tesztek között, amíg a stats persistence (Phase 5) be nem jön — akkor is inkább *tudatosan* állítsd be vagy töröld a storage-t a teszt elején.

## 18. Olvasható tesztnevek

A teszt neve mondja el az elvárást:
- jó: `Animals: random Right or Wrong advances to the next card`
- rossz: `test1`, `study works`

A jövőbeli te / a CI log így dokumentációként is működik.

---

## Gyors döntési segéd

| Kérdés | Inkább E2E | Inkább rövidebb / unit |
| --- | --- | --- |
| Elérhető-e az oldal a menüből? | igen | — |
| Jól számol-e egy helper? | — | igen |
| Rossz URL-re mi történik? | igen | — |
| Right vs Wrong state tömbbe kerül-e? | E2E a UI-t; a tömb logikája unit is lehet | mindkettő, más szinten |
| Mindhárom kategória × minden kártya × Right/Wrong? | ne mind E2E-ben | minták + 1 journey elég |

---

## Kapcsolódó fájlok

- Tesztek: `e2e/app.spec.ts`
- Config: `playwright.config.ts`
- Követelmények: `TODO.md`, `specification.md`

Ha új Phase készül (quiz, redo, stats), érdemes ehhez a doksihoz igazítva *új, rövid* E2E blokkokat írni, nem egyetlen monolitikus „minden Phase egy tesztben” fájlt.

---

## Források / Further reading

A fenti elvek **összefoglaló** jellegűek: részben a Playwright hivatalos ajánlásai, részben általános szoftvertesztelési gyakorlat, részben ennek a projektnek a döntései. Nem egyetlen tankönyv fejezete.

### Hivatalos / kanonikus anyagok

| Elv (doksi) | Mi támasztja alá |
| --- | --- |
| User-visible behavior, ne implementációt tesztelj (1, 15) | [Playwright Best Practices — Test user-visible behavior](https://playwright.dev/docs/best-practices#test-user-visible-behavior) |
| Függetlenség / izoláció (4, 17) | [Playwright — Make tests as isolated as possible](https://playwright.dev/docs/best-practices#make-tests-as-isolated-as-possible) |
| Role/locators, user-facing selektorok (5) | [Playwright — Locators](https://playwright.dev/docs/locators), [Prefer user-facing attributes](https://playwright.dev/docs/best-practices#prefer-user-facing-attributes-to-xpath-or-css-selectors) |
| Auto-wait, web-first assertions (11) | [Playwright — Auto-waiting](https://playwright.dev/docs/actionability), [Web-first assertions](https://playwright.dev/docs/best-practices#use-web-first-assertions) |
| Trace, report, debug (14) | [Playwright — Trace viewer](https://playwright.dev/docs/trace-viewer), [HTML reporter](https://playwright.dev/docs/test-reporters#html-reporter) |
| Párhuzamosság (17) | [Playwright — Parallelism](https://playwright.dev/docs/test-parallel) |
| Tesztpiramis, mit tegyél E2E-be (9, 7) | [Martin Fowler / Ham Vocke — The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) |
| Arrange–Act–Assert (10) | Klasszikus unit/E2E szerkezet; lásd pl. [AAA pattern (rövid áttekintés)](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) |
| Acceptance criteria ↔ tesztek (8) | Általános agile/ATDD gyakorlat; a projektben: `TODO.md`, `specification.md` |

### Projekt-specifikus döntések (nem „szabvány-kötelező”, de védhetők)

| Döntés | Logikai indok |
| --- | --- |
| Determinisztikus mag + random kiegészítés (3, 13) | A reprodukálhatóság és az áglefedés CI-ben fontosabb, mint a tiszta random. A random *exploratív* plusz; a kritikus ágak fix tesztekben is megvannak. |
| Rossz URL / invalid category (6) | Negatív / edge-case tesztelés: a belépési pont nem csak a UI. Deep link és kézi URL valós kockázat SPA-knál. |
| Rövid tesztek + kevés journey (7) | Tesztpiramis + költség: E2E drága; a hosszú journey-k értékesek smoke-ként, de nem skálázódnak jól minden kombinációra. |
| Statikus data modul import a tesztben (12) | Ugyanaz a szerződés, mint az appé — elkerüli a „bemagolt” stringek elcsúszását, ha a deck változik. |
| Olvasható nevek, annotation a random választásra (18) | A bukás és a riport értelmezhetősége része a fenntartható tesztelésnek. |

### További olvasnivaló

- [Playwright Best Practices (teljes oldal)](https://playwright.dev/docs/best-practices)
- [Playwright Writing tests](https://playwright.dev/docs/writing-tests)
- [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/) (ugyanaz a „user-facing” filozófia, React Testing Library kontextusban)
