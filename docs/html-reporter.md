# Playwright HTML reporter

A tesztek összefoglalója böngészőben (passed / failed, részletek).

> Az alapértelmezett `list` reporter **nem** ide ír — az csak a terminálba listáz.  
> Környezetek (te vs agent, mi közös): lásd `docs/environments.md`.

## Riport generálása

```powershell
npm.cmd run test:e2e -- --reporter=html
```

Ez létrehozza / frissíti a `playwright-report/` mappát a projekt gyökerében  
(ez a mappa a `.gitignore`-ban van — nem kerül gitbe).

## Riport megnyitása

```powershell
npx.cmd playwright show-report
```

A parancs helyi szervert indít, és általában megnyitja a böngészőt.  
Tipikus cím (a terminál kiírja pontosan):

- [http://localhost:9323/](http://localhost:9323/)

Ha a 9323 foglalt, pl.:

```powershell
npx.cmd playwright show-report --port 9324
```

- [http://localhost:9324/](http://localhost:9324/)

## Fontos

1. Először futtasd a teszteket `--reporter=html`-lel, **azután** a `show-report`-ot.
2. Ha még nincs `playwright-report/`, a `show-report` nem tud mit megnyitni.
3. Új tesztfuttatás felülírja a legutóbbi HTML riportot.
