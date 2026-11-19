// Tiny, safe formatting for reader essays. Stored as plain text with light marks:
// **bold**, *italic*, ## heading, > quote. Rendered with DOM nodes only, never innerHTML.
export function renderEssay(src: string, into: HTMLElement) {
  into.textContent = '';
  src.replace(/\r/g, '').split(/\n{2,}/).forEach(block => {
    block = block.trim(); if (!block) return;
    let el: HTMLElement;
    if (block.startsWith('## ')) { el = document.createElement('h3'); block = block.slice(3); }
    else if (block.startsWith('> ')) { el = document.createElement('blockquote'); block = block.replace(/^> ?/gm, ''); }
    else el = document.createElement('p');
    inline(block.replace(/\n/g, ' '), el); into.appendChild(el);
  });
}
function inline(s: string, el: HTMLElement) {
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g; let last = 0, m;
  while ((m = re.exec(s))) {
    if (m.index > last) el.append(s.slice(last, m.index));
    const tag = document.createElement(m[1] ? 'strong' : 'em'); tag.textContent = m[1] || m[2]; el.appendChild(tag);
    last = re.lastIndex;
  }
  if (last < s.length) el.append(s.slice(last));
}
// Editor (contenteditable) -> marked text
export function serialise(root: HTMLElement): string {
  const out: string[] = [];
  const run = (n: Node): string => {
    if (n.nodeType === 3) return (n.textContent || '').replace(/\*/g, '');
    if (n.nodeType !== 1) return '';
    const e = n as HTMLElement, t = e.tagName, kids = Array.from(e.childNodes).map(run).join('');
    if (t === 'BR') return '';
    const w = getComputedStyle(e);
    const bold = t === 'B' || t === 'STRONG' || (t === 'SPAN' && +w.fontWeight >= 600);
    const ital = t === 'I' || t === 'EM' || (t === 'SPAN' && w.fontStyle === 'italic');
    let r = kids; if (!r.trim()) return r;
    if (ital) r = `*${r}*`; if (bold) r = `**${r}**`; return r;
  };
  let buf = '';
  const flush = () => { if (buf.trim()) out.push(buf.trim()); buf = ''; };
  root.childNodes.forEach(n => {
    const e = n as HTMLElement, t = n.nodeType === 1 ? e.tagName : '';
    if (!/^(DIV|P|H3|BLOCKQUOTE)$/.test(t)) { if (t === 'BR') flush(); else buf += run(n); return; }
    flush();
    const text = Array.from(e.childNodes).map(run).join('').trim();
    if (text) out.push(t === 'H3' ? '## ' + text : t === 'BLOCKQUOTE' ? '> ' + text : text);
  });
  flush();
  return out.join('\n\n');
}
