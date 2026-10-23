# Quality Assessment and Risk of Bias Tool Repository

[View the website](https://syd-kiwi.github.io/risk-bias-demo/) · [About the authors](https://syd-kiwi.github.io/risk-bias-demo/authors.html)

A searchable collection of assessment tools by Leila Ledbetter and Stephanie Hendren.

## How to update the tools

**Edit the Google Sheet. You do not need to upload anything to GitHub.**

1. Open [the Google Sheet](https://docs.google.com/spreadsheets/d/1KPMWEY3MhG0sAQhqclQwoKqnzxfL0F9OlAPWLbLqVQM/edit?usp=drivesdk) using your Virginia Tech account.
2. Make your changes in **Sheet1**. Google saves them automatically.
3. Wait a few minutes, then refresh the website and check a tool you changed.

Only approved content belongs in Sheet1: this tab is published publicly. Sheet2 is not published. Other people need editing access to change the Google Sheet; ask the owner to grant it.

## Keep these things the same

- Keep the tab named **Sheet1** and keep all column headings.
- Keep each tool’s rows together. Additional study types go below the tool with the name cell blank. Remove the full group of rows when deleting a tool.
- Get Leila’s approval before adding tools.
- In **Link to tool**, enter the full web address as text, including `https://`. The live feed reads the displayed cell value.

## If changes do not appear

Wait a few minutes and refresh again. In Google Sheets, check **File → Share → Publish to web → Published content & settings**. Keep **Sheet1** published and **Automatically republish when changes are made** checked.

If Google is temporarily unavailable, the website shows a clearly labeled Excel backup. Recent edits may not appear until the live connection works again.

To undo an edit in Google Sheets, use **File → Version history → See version history**. Ask the maintainer for help with author bios, photos, or design changes.

## For the website maintainer

`data-source.json` stores the published Google Sheets CSV link. `source-workbook.xlsx` is the saved backup, not the live source. If the Google Sheet is replaced or publishing is restarted with a new link, update the configuration. The site reads the live feed when visitors open or refresh the page; it does not continuously refresh an already-open page.

## Credits and license

Repository © 2026 Leila Ledbetter and Stephanie Hendren. [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). [Original OSF repository](https://osf.io/ws824/). Web adaptation by [Sydney Johns](https://github.com/syd-kiwi).

Tool links and validity/reliability evidence have not been independently rechecked for this website.

Spreadsheet reader: SheetJS Community Edition 0.20.3, Apache 2.0. See [license](vendor/SHEETJS-LICENSE.txt).
