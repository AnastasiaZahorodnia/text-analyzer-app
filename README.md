# Text Analyzer Web App

Simple Angular standalone application that lets you:

* type or paste any text into a textarea;
* select a word or phrase and press **Get synonyms** – the app queries the free [Datamuse API](https://www.datamuse.com/api/) and shows up to 20 synonyms;
* click a synonym to instantly replace the selected fragment in the text;
* see live **character** and **word** counters;
* copy the entire text with one click.

---

## Prerequisites

* **Node.js 18 LTS+** (any LTS works; odd-numbered versions are not recommended for production).
* **npm 9+** (bundled with Node).

Install project dependencies once:

```bash
npm ci   # or npm install
```

---

## Development

Run a local dev server with hot-reload:

```bash
npm start   # alias for ng serve
```

Open <http://localhost:4200> in your browser.

---

## Production build

```bash
npm run build   # alias for ng build --configuration production
```

Optimised files are emitted to `dist/`.

---

## Project structure (key files)

```
src/
 ├─ app/
 │   ├─ text-analyzer/             # main feature component
 │   │   ├─ text-analyzer.component.{ts,html,css}
 │   ├─ synonym.service.ts         # Datamuse HTTP client
 │   ├─ app.routes.ts              # single route -> TextAnalyzerComponent
 │   └─ app.config.ts              # global providers (HttpClient etc.)
 └─ main.ts                        # bootstrap application
```

---

## Lint & format

ESLint is not included in this lightweight test project.
Code is formatted with Prettier (run `npx prettier --write "src/**/*.{ts,html,css}"`).

---

## Credits

Created as a solution for a recruitment test task.
