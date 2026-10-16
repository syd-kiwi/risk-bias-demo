# Risk of Bias Directory — Hosting Demo

A dependency-free static website demonstrating a searchable directory of assessment tools.

**All current records are fictional examples. This prototype must not be used to select an assessment tool.**

## View locally

Download `index.html` and open it in a browser. Search and study-design filters run entirely in the browser. No installation is required.

## Publish with GitHub Pages

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main** and **/(root)**, then **Save**.
4. Wait for deployment and use the URL shown by GitHub.

Expected URL after Pages is enabled: https://syd-kiwi.github.io/risk-bias-demo/

Committing these files does not itself confirm Pages is enabled or the site is live.

## Update the directory

Edit the `records` array in `index.html`. Replace fictional examples with approved tool records only after checking study-design fit, official sources, and validity/reliability evidence. Update the rendering fields to include citations and source links when real records are introduced.

Check search, every filter, no-results behavior, and mobile layout after edits. Check the published URL after a deployment.

## Maintenance and handoff

- Repository owner: Sydney Johns (`syd-kiwi`).
- Assign a backup maintainer before long-term release.
- Agree on the data approval process with the project lead.
- Review links quarterly and document changes in commits.
- Keep unpublished reviewer notes, credentials, and private research data out of this public repository.
- No external libraries, build process, backend, or data collection are used.

## Current scope

This is a hosting and interface prototype. It does not score studies, contain vetted instruments, or establish validity or reliability for any instrument.
