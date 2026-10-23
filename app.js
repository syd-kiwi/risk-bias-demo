let data=[];
const $=id=>document.getElementById(id);
function node(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
function safeUrl(url){try{const u=new URL(url);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}
function linkedText(text){const p=node('p');const re=/https?:\/\/[^\s<>]+/g;let start=0;for(const m of text.matchAll(re)){p.append(document.createTextNode(text.slice(start,m.index)));let url=m[0].replace(/[.,;]+$/,'');const a=node('a',url);a.href=safeUrl(url)||'#';p.append(a,document.createTextNode(m[0].slice(url.length)));start=m.index+m[0].length;}p.append(document.createTextNode(text.slice(start)));return p;}
function filterRecords(items,q,study,evidence){q=q.toLowerCase().trim();return items.filter(r=>(!study||r.studyTypes.includes(study))&&(!evidence||(r.evidence.toLowerCase()||'blank')===evidence)&&[r.name,r.description,r.citation,r.notes,...r.studyTypes].join(' ').toLowerCase().includes(q));}
function render(){const found=filterRecords(data,$('query').value,$('study').value,$('evidence').value);if($('sort').value!=='source')found.sort((a,b)=>a.name.localeCompare(b.name)*($('sort').value==='az'?1:-1));$('count').textContent=`Showing ${found.length} of ${data.length} tools`;$('empty').hidden=found.length>0;$('rows').replaceChildren(...found.map(r=>{const tr=node('tr'),info=node('td'),details=node('details');details.append(node('summary',r.name));for(const [title,value]of [['Description',r.description],['Citation',r.citation],['Notes',r.notes]])if(value){details.append(node('h3',title),linkedText(value));}details.append(node('p',`Source: Sheet1, row ${r.sourceRow}`,'source-row'));info.append(details);const types=node('td'),tags=node('div',undefined,'tags');r.studyTypes.forEach(t=>tags.append(node('span',t,'tag')));types.append(tags);const evidence=node('td');evidence.append(node('span',r.evidence?`${r.evidence} (as reported)`:'Not recorded','evidence'));const access=node('td');const url=safeUrl(r.url);if(url){const a=node('a','Open tool ↗');a.href=url;a.setAttribute('aria-label','Open '+r.name);access.append(a);}else access.textContent=r.url||'No link recorded';tr.append(info,types,evidence,access);return tr;}));}
async function startDirectory() {
  const controls=['query','study','evidence','sort','reset'];
  controls.forEach(id=>$(id).disabled=true);
  $('count').textContent='Loading tools from the spreadsheet…';
  try {
    data=await WorkbookTools.loadWorkbook();
    const types=[...new Set(data.flatMap(r=>r.studyTypes))].sort();
    types.forEach(t=>{const o=node('option',t);o.value=t;$('study').append(o);});
    $('total').textContent=data.length;
    $('types').textContent=types.length;
    document.querySelectorAll('.tool-count').forEach(e=>e.textContent=data.length);
    ['query','study','evidence','sort'].forEach(id=>$(id).addEventListener(id==='query'?'input':'change',render));
    $('reset').addEventListener('click',()=>{
      ['query','study','evidence'].forEach(id=>$(id).value='');
      $('sort').value='source';render();
    });
    controls.forEach(id=>$(id).disabled=false);
    render();
  } catch(error) {
    $('count').setAttribute('role','alert');
    $('count').textContent='The tool directory could not load. Please refresh the page or download the source spreadsheet above.';
    $('load-error').hidden=false;
    $('load-error').textContent=error.message;
    console.error('Workbook load failed:',error);
  }
}
startDirectory();
