# Developer README

Use this guide to find the right file, make a change, and check the result. For everyday tool edits, see the [main README](README.md).

## 1. Find what you want to change

| I want to… | Edit here | What to do |
| --- | --- | --- |
| Update a tool, description, citation, or link | [Google Sheet](https://docs.google.com/spreadsheets/d/1KPMWEY3MhG0sAQhqclQwoKqnzxfL0F9OlAPWLbLqVQM/edit) | Edit the approved content in **Sheet1**, then refresh the website after a few minutes. |
| Change the homepage wording or section order | [index.html](index.html) | Find the visible text or section and edit it. |
| Change colors, spacing, fonts, or table layout | [styles.css](styles.css) | Edit the matching style rule. This also styles the author page. |
| Update author names, biographies, or photos | [authors.html](authors.html) | Edit the matching author section. Photos are embedded image data URLs. |
| Change search, filters, sorting, or tool details | [app.js](app.js) | Use the function guide below. Also edit the control or table markup in `index.html` when needed. |
| Connect a replacement Google Sheet | [data-source.json](data-source.json) | Replace `publishedCsvUrl` with the approved tab's published CSV URL. |
| Refresh the saved Excel backup | [source-workbook.xlsx](source-workbook.xlsx) | Replace the file with an approved export using the same filename. |

**Adding tools requires Leila's approval.** Keep unapproved candidates outside the published directory.

## 2. Preview your changes

For small text edits, use GitHub: open the file, choose the pencil icon, edit, and use **Preview** to review the diff before committing.

For layout or code changes, preview locally with Python 3:

```bash
git clone https://github.com/syd-kiwi/risk-bias-demo.git
cd risk-bias-demo
python3 -m http.server 8000
```

If you already have the repo, run the last command inside its folder. Open <http://localhost:8000/>. Stop the server with **Ctrl+C**.

There is no install or build step. Use the local server because opening an HTML file directly will prevent some data requests from working.

## 3. Follow the recipe for your change

### Change homepage text or design

1. Search `index.html` for the words you see on the page.
2. Edit the text, or move the whole section to change its order.
3. For appearance, edit the matching class in `styles.css`.
4. Refresh your preview and check both a wide and narrow window.

Keep element IDs when moving sections: JavaScript uses them. Navigation, logos, and footers are repeated across pages; update each affected page.

### Add a new spreadsheet field

Example: add a **Maintainer** field to each tool.

1. Add a `Maintainer` column to the Google Sheet and Excel backup.
2. In `workbook.js`, add `maintainer: 'Maintainer'` to the `headers` object.
3. In the record object inside `parseWorkbook()`, add `maintainer: text(cell(row, 'maintainer'))`.
4. In `app.js`, add `['Maintainer', r.maintainer]` to the list of detail fields in `render()`.
5. To make it searchable, add `r.maintainer` to the search field list in `filterRecords()`.
6. Check both the Google Sheet and backup loading.

Follow the existing comma placement in each object or list. Adding a heading to `headers` makes it required in both data sources. If you want a separate table column, also add its heading in `index.html` and its cell in `render()`.

### Add or change a filter

1. Add the labeled control in `index.html`.
2. Update `filterRecords()` and its call in `render()` in `app.js`.
3. In `startDirectory()`, include the new control in loading, event handling, and reset behavior.
4. Check the new filter alone, with other filters, and after **Clear filters**.

Study type choices come from the spreadsheet automatically. Evidence choices are written directly in `index.html`.

### Replace the data source or backup

In `data-source.json`, keep `mode` set to `"google-sheets"` for live data. Set `publishedCsvUrl` to a **published CSV** URL using HTTPS on `docs.google.com`. A normal editing or sharing URL will not work.

To refresh the backup, export the approved sheet as Excel and replace `source-workbook.xlsx`. Keep the tab named **Sheet1** and the headings below. Every sheet included in the downloadable workbook is public.

The backup is updated manually. To preview it locally, temporarily set `mode` to `"workbook"`, refresh, and restore `"google-sheets"` afterward.

## 4. Understand the small amount of code

| File / function | Purpose |
| --- | --- |
| `workbook.js → loadWorkbook()` | Reads configuration, tries Google Sheets, then uses the Excel backup if the live request or parsing fails. |
| `workbook.js → parseWorkbook()` | Turns spreadsheet rows into tool records. |
| `app.js → startDirectory()` | Loads records, fills study type choices, and connects controls. |
| `app.js → filterRecords()` | Applies text search, study type, and evidence filters. |
| `app.js → render()` | Sorts results and builds the table and expanded details. |

The main page loads scripts in this order: **SheetJS → workbook.js → app.js**. Keep that order. SheetJS is bundled in `vendor/`; preserve its license.

### Spreadsheet rules to preserve

| Heading in the first row | Property used by JavaScript |
| --- | --- |
| Tool Name | `name` |
| Tool Description | `description` |
| Citation | `citation` |
| Link to tool | `url` |
| Study Type/Intended Use | `studyTypes` |
| Validation/Reliability information published | `evidence` |
| Notes | `notes` |

All seven headings are required. Column order can change.

A row with a tool name starts a record. A following row with a blank name adds only its study type to that tool. Keep those rows together. Use full visible URLs in Google Sheets, including `https://`.

### When reorganizing files

Keep paths relative so the site works under `/risk-bias-demo/`. Update HTML links, script paths, downloads, and JavaScript fetch paths together. Fetch paths are relative to the page, not the script's folder.

Render spreadsheet content with text nodes or `textContent`, and keep the HTTP/HTTPS link checks.

## 5. Check and publish

Before committing, check the parts you changed:

- Text or design: check desktop and narrow layouts, links, and keyboard access.
- Directory code: check search, combined filters, sorting, clear filters, expanded details, and no results.
- Data loading: block the Google CSV request in browser developer tools and reload. Confirm the backup notice appears, then unblock it. Missing configuration or an invalid source URL causes an error before fallback.

For code changes, use a branch and pull request so the diff can be reviewed. This repo has no committed automated test suite.

After merging, check the deployment in GitHub **Settings → Pages**, then open [the published website](https://syd-kiwi.github.io/risk-bias-demo/) and verify the change. Google Sheet edits appear after republishing and a page refresh; code and file edits require a site deployment.

If needed, revert the code commit. For Google Sheet edits, use **File → Version history**. Keep the author credits, Duke attribution, collection license, and dependency license.
