# Hogyan épül fel a Spanish Flashcards app?

Ez a doksi **ennek a projektnek** a technikai felépítését magyarázza, kevés előismerettel. Nem kell memorizálni a szakkifejezéseket. A cél: ha kinyitod a mappákat a Cursorban, legyen egy térképed, *mi miért van ott*.

A Vercel „Web App vagy Static Site?” kérdéséről külön írtunk: `docs/web-app-vs-static-site.md`. Az a **kitétel / címkézés**. Ez a fájl a **ház alaprajza**.

---

## 1. Egy mondatban

Böngészőben futó **tanulóalkalmazás**: spanyol kártyák, fordítás, Right/Wrong.  
**Nincs saját szerver, nincs adatbázis, nincs bejelentkezés.** A szavak a projektben lévő fájlban vannak. Amit a gép megjegyez (melyik kártyánál tartasz), az a **böngésző memóriája** — oldalfrissítésig.

A specifikáció ezt hívja *front-end-only*-nak: csak a „kirakat” (amit látsz és kattintasz), nincs „hátsó raktár” (backend).

---

## 2. Háztartási hasonlat

| A házban | Az appban |
| --- | --- |
| Címtábla, bejárat | `index.html` — a böngésző ezt nyitja meg először |
| Falak, szobák, bútorok | React **komponensek** (gomb, kártya, oldal) |
| Térkép: melyik ajtó hova visz | **React Router** (`src/App.tsx`) |
| Szótár a fiókban | `src/data/flashcards.ts` (el gato, el pan, …) |
| Festék, betűtípus | CSS (nálunk **CSS Modules**: `Valami.module.css`) |
| Sütő, ami a hozzávalókból kész ételt csinál | **Vite** (`npm run build` → `dist/`) |
| Ellenőr, aki elírásra figyelmeztet | **TypeScript** |

Te a **hozzávalókat** szerkeszted (`src/`). A látogató a **kész ételt** kapja (böngésző + később Vercel).

---

## 3. A szerszámok — mit csinálnak, mit nem

### React

A képernyőt **darabokból** rakja össze. Egy darab = komponens, pl. a megfordítható kártya (`Flashcard.tsx`).  
Ha változik valami (fel van-e fordítva a kártya), a React **újrarajzolja** azt a darabot. Nem kell az egész oldalt kézzel HTML-ként újraírni.

### TypeScript

JavaScript, plusz **címkék a adatokra**: „ez egy kategória: animals / food / verbs”.  
Ha elírod, hogy `animlas`, a szerkesztő / a build gyakran **előre** szól, nem csak a böngészőben omlik össze. Nálunk a típusok: `src/data/types.ts`.

### Vite

Fejlesztéskor: `npm run dev` — gyorsan mutatja a változást (`docs/local-dev.md`).  
Élesre: `npm run build` — összecsomagolja a kódot a `dist/` mappába. A Vercel ezt a lépést futtatja.

### React Router

A címsor (`/`, `/study/animals`) **nem négy külön weboldal a szerveren**, hanem ugyanaz a program más „szobát” mutat. Ez az **SPA** (egyoldalas alkalmazás). Részletek: `docs/web-app-vs-static-site.md`.

### CSS Modules

A stílus a komponens mellett van, pl. `Flashcard.tsx` + `Flashcard.module.css`. A class nevek nem keverednek össze az egész oldalon. Nem Tailwind (a specifikáció megengedte volna; itt CSS Modules lett).

---

## 4. Mappatérkép (amit az Explorerben látsz)

```text
Spanish Flashcards Web App/
├── src/                 ← a program, amit szerkesztesz
│   ├── main.tsx         ← belépő: „rajzold ki az App-ot a #root-ba”
│   ├── App.tsx          ← útvonalak (melyik cím = melyik oldal)
│   ├── index.css        ← közös alapstílus (betű, margó)
│   ├── pages/           ← teljes képernyős nézetek (Home, Study, Stats…)
│   ├── components/      ← újrafelhasználható darabok (kártya, keret)
│   └── data/            ← kártyaszövegek és kategóriák
├── e2e/                 ← Playwright: gép kattint, mint egy felhasználó
├── docs/                ← magyarázó szövegek (ez is)
├── public/              ← ritkán változó statikus cucc (pl. ikon)
├── package.json         ← „milyen eszközök kellenek, milyen parancsok vannak”
├── index.html           ← üres keret; a React ide tölti a tartalmat
└── dist/                ← build után készül; gitben nincs (gitignore)
```

**pages vs components:**  
- *Page* = egy útvonalnyi képernyő (Home, kategóriaválasztó, Study).  
- *Component* = kisebb elem, amit egy page belerak (a kártya több oldalon is megjelenhetne).

**data:** nem egy távoli adatbázis. Fájl a projektben. Ha új szót akarsz, ide írod — deploy után a látogató is azt kapja.

---

## 5. Mi történik, ha a Home-on a Study Mode-ra kattintasz?

1. A `HomePage` egy **link** (`to="/study"`).
2. A Router az `App.tsx`-ben látja: `/study` → `CategorySelectionPage`, mód: study.
3. Animalsre kattintasz → `/study/animals`.
4. A `StudyPage` kiolvassa az URL-ből: kategória = animals. Ha ismeretlen (pl. `/study/xyz`), visszavisz a kategóriaválasztóra.
5. A `getCardsByCategory('animals')` kiveszi a négy állatos kártyát a `flashcards.ts`-ből.
6. A `Flashcard` elöl spanyolt mutat. Kattintás → angol + Right/Wrong gombok.
7. Right vagy Wrong **jelenleg ugyanazt** csinálja: következő kártya, spanyol oldal. A „Wrong lista” még TODO / GitHub issue (#2).
8. Az utolsó kártya után: „Study again” vagy vissza a Home-ra.

A **Quiz** és a **Stats** oldal létezik, de a kvíz még „later phase”, a statisztika még placeholder.

---

## 6. „Állapot” — amit a gép fejben tart

A Study oldal megjegyzi:

- hányadik kártyánál vagy (`index`)
- fel van-e fordítva (`flipped`)

Ez **React state**: a böngésző RAM-ja, nem a GitHub, nem a Vercel adatbázisa.  
Frissíted az oldalt → elölről. Másik kategóriára váltasz → új session (szándékos, hogy ne vigye magával az Animals előrehaladását).

Későbbi fázisok (Redo, Stats + `localStorage`): a böngésző *tartósabb* fiókja, még mindig nem szerver.

---

## 7. Mi *nincs* ebben az architektúrában

| Amit sok appban látni | Itt |
| --- | --- |
| Bejelentkezés, jelszó | Nincs |
| Adatbázis, API, `.env` kulcs | Nincs (és nem kell a kártyákhoz) |
| GitHub PAT | Cursor / MCP, **nem** az app része |
| Node szerver élesben | Nincs; Vite csak fejlesztéskor / buildkor kell |
| Quiz motor, redo, igazi stats | Terv: `TODO.md`, `specification.md` |

Ezért a deployhoz **nem** kell PAT-et az appba tenni. A Vercel a GitHub **kódját** buildeli.

---

## 8. Honnan indulj, ha tanulni akarod a kódot

1. `src/App.tsx` — minden út innen ágazik.  
2. `src/pages/HomePage.tsx` — amit először látsz.  
3. `src/pages/StudyPage.tsx` — a tanulás logikája.  
4. `src/components/Flashcard.tsx` — a lapozható kártya.  
5. `src/data/flashcards.ts` — a szavak.

Parancsok: `docs/local-dev.md`. Tesztelés: `docs/e2e-testing-principles.md`. Kitétel / Vite / statikus fájlok: `docs/web-app-vs-static-site.md`.
