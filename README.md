# Quality Assessment & Risk of Bias Tool Repository

Static website presenting 80 tool records from Sheet1 of the supplied repository workbook. Includes keyword search, multi-study-type filtering, reported validation/reliability filtering, alphabetical sorting, expandable descriptions/citations/notes and an unchanged Excel download.

## Source and license

Quality Assessment and Risk of Bias Tool Repository © 2026 by Leila Ledbetter and Stephanie Hendren, licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Original project: https://osf.io/ws824/ . Web adaptation by Sydney Johns. Original data wording is retained with whitespace trimming and grouping of continuation study-type rows. This is a web adaptation, not a new evidence audit or endorsement by the original authors.

Sheet2 contains one alternate AGREE II entry; it is preserved in the download but not duplicated in the directory. No disciplines, separate validity claims, IRR statistics, or evidence citations have been inferred. Combined source yes/no labels are not proof that validity and reliability have both been established. Source links have not been rechecked.

## Publish

Settings → Pages → Deploy from a branch → main → /(root) → Save.
Expected URL once deployed: https://syd-kiwi.github.io/risk-bias-demo/

## Preview and update

Open index.html locally; no build or installation is needed to view the site.
To regenerate data, run `python import_workbook.py path/to/source.xlsx` with Python and openpyxl installed. This reads Sheet1, preserves its links, groups continuation study types, writes data.js, and copies the unchanged workbook to source-workbook.xlsx. Update the import date in index.html when importing a newer source. The schema is fixed to the supplied workbook: inspect column names before importing a changed template.

Review data changes before publishing. Keep proposed new tools separate until Leila approves them. Preserve source attribution and the noncommercial license. Maintain at least two repository administrators for long-term handoff and review links regularly.
