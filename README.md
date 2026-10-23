# Quality Assessment and Risk of Bias Tool Repository

[Open the website](https://syd-kiwi.github.io/risk-bias-demo/) · [About the authors](https://syd-kiwi.github.io/risk-bias-demo/authors.html)

This website shares Leila Ledbetter and Stephanie Hendren’s collection of assessment tools. Visitors can search the tools, filter by study type and reported validation/reliability information, read supporting descriptions and citations, and download the Excel spreadsheet.

## Updating the tools without coding

**The file to update is `source-workbook.xlsx`.** The website reads `Sheet1` from this file whenever someone opens the directory. You do not need Python, a terminal, or a separate data conversion step.

In this guide, a **repository** (or **repo**) means the project folder on GitHub. A **commit** means a saved change. **GitHub Pages** publishes the files as a website.

### What you need

- A GitHub account with permission to update this repository. If you can only view files, ask the repository owner for access.
- Excel or another spreadsheet application that can save an `.xlsx` file and preserve its hyperlinks and formatting.

### Step 1 — Download the current spreadsheet

1. Open the [website](https://syd-kiwi.github.io/risk-bias-demo/).
2. Click **Download source spreadsheet**.
3. Save a backup copy before you edit it.
4. Open the downloaded file in Excel.

Start with the latest download each time so you do not overwrite someone else’s recent updates.

### Step 2 — Make your changes in Excel

Open the tab named **Sheet1**. Find the tool you want to update, then edit its description, citation, link, study types, evidence label, or notes.

Keep the sheet named `Sheet1` and keep all seven headings in row 1. The website uses the headings to find the right information; the columns can be moved together with their contents, but renaming or removing a heading will stop the directory from loading.

| Heading in row 1 | What to enter |
| --- | --- |
| Tool Name | The assessment tool’s name. A nonempty name starts a new tool record. |
| Tool Description | What the tool assesses and how it is used. |
| Citation | The tool’s supporting reference or publication. |
| Link to tool | The official web address, including `https://`. Excel hyperlinks are also read. |
| Study Type/Intended Use | One study type per row. See the example below for tools with several types. |
| Validation/Reliability information published | `yes`, `no`, or a blank cell, consistent with the source spreadsheet. |
| Notes | Other relevant information, supporting links, or evidence citations. |

**Some tools span several rows.** The first row contains the tool name. Following rows may leave the name blank and list additional study types. Those types belong to the last named tool above them.

For example:

| Tool Name | Study Type/Intended Use |
| --- | --- |
| Example Tool | Cohort studies |
| *(leave blank)* | Case control studies |

This produces **one tool with two study types**. The words “leave blank” are instructions only; do not type them into the cell. Typing a tool name on both rows would create two tool records.

- **Add a tool:** Wait for Leila’s approval, then add a new row or block of rows after an existing tool’s complete block. Enter the name on the first row and additional study types beneath it. Fill in the other fields on the first row.
- **Remove a tool:** Delete its whole block, including its continuation rows, so its study types do not move onto the preceding tool.
- **Edit merged cells:** Type in the top-left cell of the merged area. Preserve the existing grouping.
- **Keep rows together:** Do not sort individual columns or rearrange continuation rows. Visitors can sort the directory on the website.
- **Keep evidence clear:** A combined yes/no label does not establish both validity and reliability. Add supporting citations and clarify the type of evidence in Notes. A blank means not recorded; `no` is displayed as reported, not interpreted as proof that the tool is invalid.

`Sheet2` is preserved in the download but is not displayed in the directory. It contains an alternate AGREE II entry. Proposed additions should stay in a separate review document until approved.

### Step 3 — Save the updated file

1. Save the workbook as an **Excel Workbook (`.xlsx`)**.
2. Use the exact filename **`source-workbook.xlsx`**.
3. Check that your computer has not renamed it `source-workbook (1).xlsx` or `source-workbook.xlsx.xlsx`.
4. Close the workbook after saving.

### Step 4 — Upload it to GitHub

1. Sign in and open [this repository](https://github.com/syd-kiwi/risk-bias-demo).
2. Select the **Code** tab and check that the branch selector says **main**.
3. Stay in the top-level file list, where `source-workbook.xlsx` already appears. Do not open another folder.
4. Select **Add file → Upload files** and choose your updated `source-workbook.xlsx`.
5. Enter a short commit message, such as **Update tool links and evidence notes**.
6. Select **Commit directly to the main branch**, if offered, then **Commit changes**. Uploading the same filename in the same folder replaces the current version and keeps its history.

If GitHub requires a new branch and pull request, submit the change that way and ask a repository administrator to review and merge it. It will not reach the website until merged into `main`.

### Step 5 — Check the website

Allow a few minutes for GitHub Pages to publish the change, then open the website and refresh it.

- Search for a tool you changed and expand its details.
- Check its description, citation, notes, and tool link.
- If you changed study types, check that the relevant filter is available.
- If you added or removed a tool, check the total count.
- Download the spreadsheet again to confirm the published file contains your changes.

The counts and filters come from the workbook automatically. There is no date or tool count you need to edit in the website code.

## If something does not look right

| Problem | What to check |
| --- | --- |
| The website still shows the old information | Confirm the upload was saved to `main` with the exact filename. Wait a few minutes, then hard-refresh with Ctrl+Shift+R on Windows or Command+Shift+R on Mac. |
| The directory says it could not load | Check that the file is a real `.xlsx` workbook, the tab is named `Sheet1`, and all seven headings are present in row 1. The source download is still available if the directory cannot load. |
| A tool is missing | Check that it has a name in Tool Name on `Sheet1`. Entries only in `Sheet2` are not displayed. |
| A study type appears under the wrong tool | Check the blank-name continuation rows. Each belongs to the last named tool above it. |
| A changed link still opens the old address | In Excel, check **Edit Link/Edit Hyperlink**, not just the displayed text. The website uses the underlying hyperlink when one is present. |
| A tool appears twice | Check whether its name was entered again on a continuation row. |
| Upload or commit controls are missing | Confirm you are signed into the correct GitHub account and have write access. |

To undo a mistaken workbook update, upload your backup as `source-workbook.xlsx` and commit it again. If you have no backup, open the file’s **History** on GitHub, find the earlier version, download it, and upload that version using the same steps. Ask the repository owner for help if you are unsure which version to restore.

## Other website changes

Routine tool updates only require the spreadsheet. Changes to page text, author bios, photographs, layout, or colors require editing website files; ask the website maintainer for those changes if you are not comfortable editing HTML or CSS.

| File | Purpose |
| --- | --- |
| `source-workbook.xlsx` | The source of the public tool directory and the downloadable workbook. Update this for tool changes. |
| `index.html` | The main directory page, headings, navigation, and attribution. |
| `authors.html` | Author biographies, embedded portraits, and profile links. |
| `styles.css` | Duke colors, spacing, layout, and responsive styling. |
| `workbook.js` | Reads `Sheet1` directly from the workbook and groups study-type continuation rows. |
| `app.js` | Displays the tools and handles searching, filtering, and sorting. |
| `vendor/` | A bundled copy of the SheetJS spreadsheet reader and its license. Routine editors do not need to change it. |
| `README.md` | The instructions you are reading. |

To edit these instructions, open `README.md` on GitHub, click the pencil/Edit button, make your changes, preview them, and choose **Commit changes**.

## Website hosting

The website uses GitHub Pages. If hosting needs to be set up again, a repository administrator can open **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

For a maintainer preview, serve the repository with a local web server. Opening `index.html` by double-clicking it is not supported because browsers restrict spreadsheet downloads from local files. Routine editors can use the published website instead.

## Source and license

Quality Assessment and Risk of Bias Tool Repository © 2026 by Leila Ledbetter and Stephanie Hendren. Licensed under [Creative Commons Attribution–NonCommercial 4.0 International](https://creativecommons.org/licenses/by-nc/4.0/). Original repository: https://osf.io/ws824/ . Web adaptation by Sydney Johns.

The website preserves source wording with surrounding whitespace trimmed and groups continuation study-type rows. It does not independently audit tool links, establish validity/reliability, or infer missing evidence. Preserve the attribution and noncommercial license when updating the collection.

The spreadsheet reader is SheetJS Community Edition 0.20.3, bundled locally under its Apache 2.0 license. Its license is in `vendor/SHEETJS-LICENSE.txt`.

Reference: [GitHub’s guide to uploading files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).
