# Web App, statikus site, Vite — laikusoknak

Ez a doksi azt magyarázza el, **miért Web App** a Spanish Flashcards a Vercelen, holott „statikus fájlokként” kerül ki a netre. Nem kell előtte programozónak lenned; a cél a kép, nem a szakkifejezések magolása.

---

## 1. Három réteg, amit össze szoktak keverni

A Vercel (és a tanfolyam) három *különböző* kérdést tesz fel, de hasonlónak hangzanak.

| Kérdés | Példa válasz ennél az appnál | Mit dönt el |
| --- | --- | --- |
| **Mit építesz?** (Vercel: Web App / Static Site / AI…) | **Web App** | Címke, mire való a projekt. A build parancsot nem ez állítja. |
| **Miből készül a kód?** | React + TypeScript, **Vite** csomagolja | Hogyan lesz a forrásból HTML/JS. |
| **Hogyan szolgálják ki a látogatónak?** | Statikus tárhely (`dist/` fájlok) | Nincs saját szerver a kártyákhoz; a böngésző kap kész fájlokat. |

Ezért lehet igaz **egyszerre** két mondat:

- „Ez egy **webalkalmazás**” — mert tanulsz vele, kattintasz, fordul a kártya, változik az URL (`/study/animals`).
- „Ez **statikusan** van kitéve” — mert a Vercel nem futtat folyamatosan egy Node-programot a kártyák miatt; előre elkészített fájlokat ad oda.

Nem ellentmondás. Az egyik a **felhasználói élmény** (app), a másik a **kiszolgálás módja** (statikus fájlok).

---

## 2. Mi az a statikus site, hétköznapi nyelven

Képzeld el egy éttermet, ahol a menü **ki van nyomtatva**. A vendég (böngésző) elkéri a lapot, elolvassa. Ha más ételt akar, másik kinyomtatott lapot kér. A konyha nem főz *akkor*, amikor olvasol: a lapok már készen vannak.

**Statikus site:** a szerver előre elkészített fájlokat ad (HTML, kép, CSS). Klasszikus példa: egy bemutatkozó oldal, „Rólunk”, „Kapcsolat”, kevés kattintós logika.

A Vercel **Static Site** cimkéje erre a *jellegre* utal: dokumentáció, landing page, blog. Nem azt jelenti, hogy „csak ez mehet statikus tárhelyre”.

---

## 3. Mi az a Web App

Ugyanaz az étterem, de van egy **interaktív menü**: kiválasztod a kategóriát, megfordítod a kártyát, Right/Wrong. A képernyő változik anélkül, hogy minden kattintásra egy teljesen új „nyomtatott könyvet” hoznál a raktárból.

**Web App:** a böngészőben *program* fut (nálunk a React). Állapot van (melyik kártya, fel van-e fordítva), gombok, útvonalak.

A flashcard:

- Home → Study Mode → Animals  
- kártya flip  
- következő kártya  

Ez alkalmazás-viselkedés, nem egyetlen merev HTML-oldal. Ezért a Vercel **What are you building?** kérdésére: **Web App**.

Nem kell bejelölni:

- **AI app / AI agent** — a kártyák nem mesterséges intelligenciát hívnak.
- **API or Backend** — nincs saját adatbázis-szerver, amit a Vercelnek futtatnia kellene.
- **Internal Tool** — ez nyilvános tanuló / portfólió app, nem céges belső eszköz.

---

## 4. Akkor miért mondtuk, hogy „futáskor statikus”?

A szakács (Vite) **otthon, a build alatt** megfőzi az egészet:

```text
src/  (React kód, amit te szerkesztesz)
        │
        │  npm run build
        ▼
dist/  (kész HTML + JS + CSS — ezt kapja a látogató)
```

A vendéghez már a **kész étel** megy. A Vercel a `dist/` tartalmát teszi ki. Ezt hívják **statikus hostingnak**.

Összefoglalva:

```text
Te írod:     Web App (React)
Vite csinál: egy csomag fájl (build)
Vercel adja: statikus fájlokat a böngészőnek
```

A „Static Site” gomb a Vercel *első* képernyőjén **nem** ezt a hostingot kérdezi, hanem hogy *milyen fajta terméket* építesz. Egy interaktív tanulóappot Web Appnak hívjuk, még ha fájlokként szolgálják is ki.

---

## 5. Vite vs „nyers” Static HTML — ez egy *másik* Vercel-képernyő

Később (vagy a projektbeállításokban) jön a **Framework**: Vite, Next.js, „Other”, stb.

| Ha ezt választod | Mi történik |
| --- | --- |
| **Vite** | Lefuttatja a `npm run build`-et, kimenet: `dist`. **Ezt kell.** |
| Nyers **Static HTML** / Other, build nélkül | Azt hinné, a repo gyökerében kész HTML van. Nálunk a gyökérben forráskód van (`src/`), nem a kész site. Elromlana vagy üres/rossz oldal jönne ki. |

Hasonlat: a Vite a **sütő**. A Static HTML preset azt feltételezi, hogy a süti már kész, csak tálalni kell. Nálunk előbb sütni kell (`npm run build`).

A `package.json` ezt írja:

- `dev` — helyi tanulás, forró utánöltés (Vite dev szerver)
- `build` — production csomag a `dist/`-be
- `preview` — a `dist/` kipróbálása otthon, deploy nélkül

---

## 6. SPA: egy HTML, sok „oldal”

**SPA** = Single Page Application (egyoldalas alkalmazás).

A flashcardban van `/`, `/study`, `/study/animals`, `/stats`. Ezek **nem** négy külön HTML-fájl a szerveren. Van egy `index.html`, a React Router a címsor alapján *cseréli* a képernyőt.

Következmény deployon:

- A Vercelnek (Vite preset) általában el kell intéznie, hogy a `/study/animals` **frissítésre** se legyen 404, hanem ugyanazt az `index.html`-t kapja, és a React kirakja a Study oldalt.
- Ezért fontos a **Vite** framework, nem egy „csak a gyökér index.html” statikus mappa.

---

## 7. Mini döntési fa

**„Mit építek?” (cimkék)**  
→ Web App.

**„Mivel buildeljek?” (framework)**  
→ Vite; output `dist`.

**„Van-e szerver, adatbázis, PAT a deployhoz?”**  
→ Nincs. A kártyák a kódban vannak. A GitHub PAT a Cursorhoz kell, nem a Vercelhez.

**„Statikus-e?”**  
→ A *kiszolgálás* igen. A *termék* webalkalmazás.

---

## 8. Kapcsolódó fájlok

- Az app házának alaprajza (React, mappák, kattintás útja): `docs/app-felepites.md`
- Helyi indítás: `docs/local-dev.md`
- Build parancs: `package.json` → `scripts.build`
- Vite beállítás: `vite.config.ts`
- Útvonalak: `src/App.tsx`

Ha a Vercel a deploy után ad egy URL-t, azt érdemes a GitHub README-be tenni (élő demo). A `dist/` mappát ne commitold; a Vercel magának készíti a buildből.
