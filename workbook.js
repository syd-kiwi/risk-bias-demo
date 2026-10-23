/* Read the repository workbook without a generated data copy. */
(function (root) {
  'use strict';
  const headers = {
    name: 'Tool Name', description: 'Tool Description', citation: 'Citation',
    url: 'Link to tool', studyTypes: 'Study Type/Intended Use',
    evidence: 'Validation/Reliability information published', notes: 'Notes'
  };
  const normalize = value => String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
  const text = cell => cell && cell.v != null ? String(cell.v).trim() : '';

  function parseWorkbook(bytes) {
    if (!root.XLSX) throw new Error('The spreadsheet reader could not be loaded.');
    const workbook = root.XLSX.read(bytes, {type: 'array', cellHTML: false});
    const sheet = workbook.Sheets.Sheet1;
    if (!sheet || !sheet['!ref']) throw new Error('The workbook needs a sheet named Sheet1.');
    const range = root.XLSX.utils.decode_range(sheet['!ref']);
    const columns = {};
    for (const [key, label] of Object.entries(headers)) {
      for (let c = range.s.c; c <= range.e.c; c++) {
        if (normalize(text(sheet[root.XLSX.utils.encode_cell({r: 0, c})])) === normalize(label)) {
          columns[key] = c;
          break;
        }
      }
      if (columns[key] === undefined) throw new Error('Missing spreadsheet column: ' + label);
    }
    const records = [];
    const cell = (row, key) => sheet[root.XLSX.utils.encode_cell({r: row, c: columns[key]})];
    for (let row = 1; row <= range.e.r; row++) {
      const name = text(cell(row, 'name'));
      if (name) {
        const link = cell(row, 'url');
        records.push({
          name, description: text(cell(row, 'description')), citation: text(cell(row, 'citation')),
          url: link?.l?.Target || text(link), studyTypes: [],
          evidence: text(cell(row, 'evidence')), notes: text(cell(row, 'notes')), sourceRow: row + 1
        });
      }
      const type = text(cell(row, 'studyTypes'));
      if (type && records.length) {
        const current = records[records.length - 1];
        if (!current.studyTypes.includes(type)) current.studyTypes.push(type);
      }
    }
    if (!records.length) throw new Error('No tools were found in Sheet1.');
    return records;
  }

  async function loadWorkbook() {
    const response = await fetch('source-workbook.xlsx', {cache: 'no-store'});
    if (!response.ok) throw new Error('The spreadsheet download failed (' + response.status + ').');
    return parseWorkbook(await response.arrayBuffer());
  }
  root.WorkbookTools = {parseWorkbook, loadWorkbook};
})(globalThis);
