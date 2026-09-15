# Agent diff review vs Source Control

Emlékeztető: mi a különbség a chatben megjelenő **Keep / Reject (Undo)** és a **Source Control (git)** között.

---

## Rövid válasz

| Kérdés | Válasz |
| --- | --- |
| Keep All nélkül is látja a Source Control a módosítást? | **Igen**, ha az agent már **kiírta a fájlt a lemezre**. Akkor `modified` / untracked lesz. |
| A Reject (X) a Source Control Discard? | **Nem.** Az a **pending AI-diff** elvetése (visszaállítja azt az agent-változtatást). |
| Keep All kell a githoz? | **Nem** a megléthez. Commithoz továbbra is neked kell stage + commit. |

---

## Két külön „réteg”

### 1. Agent review panel (chat mellett)

Ilyen feliratok / gombok: **Keep**, **Reject** (X), **Keep All**, **Undo All**, fájlonként +/−.

- Az agent által ebben a körben érintett fájlok listája.
- **Keep / Keep All:** megtartod a változtatást.
- **Reject (X) / Undo All:** elveted — a fájl visszaáll a változtatás előtti állapotra (erre a diffre nézve).
- Csak akkor van értelme, amíg ez a review lista él / ezek a pending agent-változtatások.

Ez **nem** a git commit UI.

### 2. Source Control (git)

Bal oldali elágazó ikon, `git status`, staged / changes.

- Azt mutatja, ami a **working tree**-ben különbözik az utolsó commitól.
- Ha a fájl már a lemezen módosult, itt megjelenik — **Keep All nélkül is**.
- Visszavonás itt: Discard / `git restore` (git szerinti), nem ugyanaz a gomb, mint a chat Rejectje.
- Verzióba csak **commit** után kerül.

---

## Tipikus agent folyamat (ahogy nálunk is történt)

```text
Agent szerkeszt
    → gyakran rögtön kiír a lemezre
    → Source Control: már „modified”
    → közben a chatben lehet Keep / Reject sáv

Ha Keep / semmi review-kattintás:
    → a lemezre írt tartalom megmarad
    → Source Control továbbra is mutatja

Ha Reject / Undo:
    → az a változtatás visszavonódik
    → Source Controlból is eltűnhet (ha visszaállt a committed állapotra)
```

**Elfelejtett review:** önmagában általában **nem törli** a már kiírt fájlokat. A biztonság kedvéért nézd a Source Controlt vagy a `git status`-t.

---

## Tanfolyam vs. ez a projekt (példa)

A tanfolyam videóban gyakran **Flashcard.tsx** + inline Accept/Reject diff látszik.

Nálunk a szándékos teszt-hiba a **`StudyPage.tsx`**-ben volt (`flipped` → `!flipped`), és az agent **közvetlenül alkalmazta** — ezért:

- a `Flashcard.tsx`-en nem volt Reject,
- a review a chat **Files** listájában jelent meg (X = Reject),
- a Source Controlban a `StudyPage.tsx` **modified** lett Keep All nélkül is.

---

## Gyakorlati tippek

1. Bizonytalan vagy? **Source Control** / `git status` — ez a „mi van a lemezen” igazság.
2. Csak egy fájlt akarsz elvetni a review-ból: azon a soron **Reject (X)**, ne Undo All-t (ha a többit meg akarod tartani).
3. Inline Diffs bekapcsolva (Cursor Settings → Agents) több esély van a klasszikus Accept/Reject sávra; kikapcsolva inkább auto-keep / azonnali írás.
4. A `docs/`, `playwright-report/`, `test-results/` más történet: a riportmappák ignore-olva vannak; a `docs/*.md` untracked, amíg nem addolod.

---

## Kapcsolódó

- `docs/environments.md` — te vs agent, hol van a list/HTML riport
- `docs/html-reporter.md` — HTML reporter
