# Developer README

Technical guide for future maintainers. For routine tool edits, follow the [main README](README.md).

## Run locally

The site is static HTML, CSS, and JavaScript. There is no package install, build step, backend, or API key. Python 3 is enough to serve it locally:

```bash
git clone https://github.com/syd-kiwi/risk-bias-demo.git
cd risk-bias-demo
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Use an HTTP server rather than opening HTML with `file://`, because the JavaScript fetches local files. Internet access is needed for the live Google Sheets feed and external links.

## File map

| File | Responsibility |
| --- | --- |
| `index.html` | Main directory markup, controls, table, and script loading |
| `app.js` | Directory startup, search, filters, sorting, and table rendering |
| `workbook.js` | Google Sheets loading, Excel fallback, and spreadsheet parsing |
| `data-source.json` | Data mode and published Google Sheets CSV URL |
| `source-workbook.xlsx` | Saved backup used when the live feed fails |
| `styles.css` | Directory and author page styles |
| `authors.html` | Author biographies, photos, and profile links |
| `review.html`, `review.css`, `review.js` | Separate dated evidence review interface |
| `review-data.json` | Evidence findings, candidates, and review summary |
| `downloads/` | Reviewed workbook and candidate documents linked from the review page |
| `vendor/xlsx.mini.min.js` | Bundled SheetJS Community Edition 0.20.3 spreadsheet reader |
| `vendor/SHEETJS-LICENSE.txt` | SheetJS license |

The Duke logos and author photos are embedded as image data URLs in the HTML. Shared headers and footers are repeated markup, so check all three pages when changing navigation or attribution.

## How the directory works

1. `index.html` loads SheetJS, then `workbook.js`, then `app.js` using ordered `defer` scripts.
2. `startDirectory()` disables controls and calls `WorkbookTools.loadWorkbook()`.
3. The loader fetches `data-source.json`. With `mode: "google-sheets"`, it fetches the published CSV and parses it with SheetJS.
4. If fetching or parsing the live CSV fails, it tries `source-workbook.xlsx` and sets a visible backup notice. Any mode other than `google-sheets` loads the workbook directly.
5. `app.js` uses `WorkbookTools.sourceInfo` to update the source label, download link, and notice. It builds study type options from the returned records, enables controls, and calls `render()`.

Data loads when the page opens or refreshes. There is no periodic polling. A malformed or missing configuration, or an invalid Google URL, fails before the live-feed fallback block. A missing or invalid backup also produces the directory error state.

### Spreadsheet contract

Keep the worksheet named `Sheet1` and the headings in the first row. The parser matches headings after trimming, collapsing whitespace, and lowercasing; column order can change.

| Spreadsheet heading | Record property |
| --- | --- |
| `Tool Name` | `name` |
| `Tool Description` | `description` |
| `Citation` | `citation` |
| `Link to tool` | `url` |
| `Study Type/Intended Use` | `studyTypes` |
| `Validation/Reliability information published` | `evidence` |
| `Notes` | `notes` |

All seven headings are required, even if some cells are blank. A nonblank tool name starts a record. A subsequent row with a blank name adds only its study type to the previous record; its other cells are not merged. Duplicate study types within a record are removed. `sourceRow` is the starting spreadsheet row, counted from 1, not a stable tool ID.

For Excel links, an embedded hyperlink target takes priority over displayed text. CSV has no hyperlink metadata: enter the full URL as visible text in Google Sheets. Sheet2 is ignored by the parser. If a workbook is offered for download, however, all of its sheets are available to the visitor.

### Search and rendering

`filterRecords()` searches name, description, citation, notes, and study types. It combines the text query with an exact study type filter and a lowercased evidence label filter. Search does not include the tool URL or evidence label. The evidence options in `index.html` are fixed to `yes`, `no`, and blank; study type options are generated from data.

`render()` sorts the filtered records and rebuilds the table. Keep spreadsheet content as text through `textContent` or text nodes. Tool links pass through `safeUrl()`, which permits only HTTP and HTTPS. Preserve this behavior when adding fields.

## Making structural changes

### Add or rename a spreadsheet field

1. Update the approved Google Sheet and the saved Excel backup together.
2. Update the `headers` mapping and record construction in `parseWorkbook()` in `workbook.js`. Adding a heading to the mapping makes it required for both sources.
3. Update `render()` in `app.js` to display the field. Update `filterRecords()` if it should be searchable.
4. If adding a table column, update the table header and accessible caption in `index.html`, plus relevant layout rules in `styles.css`.
5. Check both live and backup loading before publishing. Coordinate required heading changes so visitors do not encounter a partially migrated schema.

### Add a filter or change a control

Update the control markup in `index.html`, then the filtering logic and startup/reset handling in `app.js`. New controls should be disabled during loading, enabled after success, and cleared by the reset button. If you rename an element ID, update every JavaScript reference to it. Keep labels, status announcements, keyboard access, and the empty state working.

### Replace the Google Sheet or refresh the backup

Use a published CSV URL for the approved tab in `data-source.json`; an editor or sharing URL is not the data endpoint. The current loader accepts only HTTPS URLs on `docs.google.com`. Publish only approved public content and keep automatic republishing enabled. Updating an editor sharing link does not update the published CSV configuration.

To refresh the backup, export the approved sheet to Excel and replace `source-workbook.xlsx`, preserving `Sheet1` and the required headings. Verify every included sheet is suitable for public download. The backup is not synchronized automatically, and replacing it does not change the live Google Sheet. To deliberately use only the backup, set `mode` to `"workbook"`.

### Change the evidence review

The review is a separate snapshot. `review.js` fetches `review-data.json`; it does not read the Google Sheet or workbook. The JSON has `tools`, `candidates`, and `summary` properties.

- Existing tool cards read `name`, `category`, `study_types`, `validity`, `reliability`, `version_note`, `evidence_citations`, `doi_links`, `updated_url`, `updated_link_check`, `checked`, and `row`.
- Candidate cards read `name`, `kind`, `fields`, `study`, `fit`, `evidence`, `vet`, and `links`.
- Search checks the full JSON record. Category options are generated from existing tools.

When revising a review, update its JSON, the corresponding files in `downloads/`, and the date, scope counts, method text, and download labels in `review.html`. Those displayed dates and counts are hardcoded; `summary` does not update them automatically. Also check the review banner in `index.html` and review description in `README.md`. Keep candidates separate until Leila approves their inclusion in the main collection.

### Move files or split the JavaScript

Paths are relative to the HTML page or current document URL. Moving scripts into a subfolder does not make their `fetch()` paths relative to the script. Update HTML `src`/`href` attributes and fetch paths deliberately, including downloads and fallback links. Preserve relative paths for hosting under `/risk-bias-demo/`.

`workbook.js` exposes `WorkbookTools` on `globalThis`; `app.js` depends on it and SheetJS. Preserve script order. `app.js` and `review.js` each define a global `node()` helper, so keep them on their separate pages or scope them before combining scripts. If introducing modules, update HTML script types and imports together. Update the existing query-string versions on the directory script URLs when needed to avoid stale browser assets.

## Verify and publish

Use a working branch and review the diff before merging. This repository has no committed automated test suite or build workflow. For a structural change, check locally:

- Directory loads, counts populate, and the console has no unexpected errors.
- Search, combined filters, both name sorts, reset, expanded details, and no-results state work.
- Block the Google CSV request in browser developer tools, reload, and confirm the saved backup and notice appear. Unblock it afterward.
- In a local copy, use `mode: "workbook"` and confirm direct backup loading. Restore the configuration afterward. Check the error message with an unavailable backup as well.
- Open `authors.html` and `review.html`. Check review search, categories, both tabs, navigation, and downloads.
- Check narrow screens, horizontal table scrolling, keyboard navigation, visible labels, and the skip links.

The public site is <https://syd-kiwi.github.io/risk-bias-demo/>. Verify the actual deployment source in GitHub **Settings → Pages** before changing hosting. After merging, wait for the Pages deployment and check the published pages. Google Sheet content edits need no code deployment; changes to code, configuration, backups, or review files do.

If a code change breaks the site, revert the relevant commit through the normal branch workflow. Restore Google Sheet edits using its version history separately. Preserve the authors' credits, institutional attribution, collection license, and bundled dependency license.
