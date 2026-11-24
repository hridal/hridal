// Small finishing touches. Each one is cheap: no work runs unless the visitor
// is scrolling, pointing at a card or has the quick-jump menu open.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Parallax hero: the soft gradient behind the name drifts slower than the page.
(() => {
  const intro = document.querySelector<HTMLElement>('.intro');
  const mesh = intro?.querySelector<HTMLElement>('.hero-mesh');
  if (!intro || !mesh || reduce) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if (y > intro.offsetHeight + 200) return; // hero is off screen, nothing to do
    mesh.style.transform = `translate3d(0, ${(y * 0.35).toFixed(1)}px, 0)`;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
})();

// Spotlight: a soft glow follows the pointer across project cards.
(() => {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('.spot').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
})();

// Quick-jump menu: Cmd/Ctrl + K (or "/") opens a searchable list of every page.
(() => {
  const dlg = document.getElementById('k-menu') as HTMLDialogElement | null;
  const input = document.getElementById('k-input') as HTMLInputElement | null;
  if (!dlg || !input || typeof dlg.showModal !== 'function') return;
  const items = [...dlg.querySelectorAll<HTMLLIElement>('.k-list li')];
  const empty = dlg.querySelector<HTMLElement>('.k-empty')!;
  let active = 0;

  const visible = () => items.filter(li => !li.hidden);
  const paint = () => {
    const v = visible();
    items.forEach(li => li.classList.remove('on'));
    if (v.length) { active = Math.min(active, v.length - 1); v[active].classList.add('on'); v[active].scrollIntoView({ block: 'nearest' }); }
    empty.hidden = v.length > 0;
  };
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    items.forEach(li => { li.hidden = !!q && !li.textContent!.toLowerCase().includes(q); });
    active = 0; paint();
  };
  const open = () => { if (dlg.open) return; input.value = ''; filter(); dlg.showModal(); input.focus(); };

  document.querySelectorAll('[data-k-open]').forEach(b => b.addEventListener('click', open));
  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement).tagName) || (e.target as HTMLElement).isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.open ? dlg.close() : open(); }
    else if (e.key === '/' && !typing && !dlg.open) { e.preventDefault(); open(); }
  });
  input.addEventListener('input', filter);
  input.addEventListener('keydown', e => {
    const v = visible();
    if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % Math.max(v.length, 1); paint(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + v.length) % Math.max(v.length, 1); paint(); }
    else if (e.key === 'Enter') { e.preventDefault(); v[active]?.querySelector('a')?.click(); }
  });
  // Click on the dimmed backdrop closes it.
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  // Show the right shortcut on Windows and Linux.
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) document.querySelectorAll('.k-btn kbd').forEach(k => { k.textContent = 'Ctrl K'; });
})();

// Sign-off: the signature writes itself left to right, then a fine underline is drawn, when the footer comes into view (peak-end rule).
(() => {
  const so = document.querySelector<HTMLElement>('.signoff'); if (!so) return;
  so.querySelector('.to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  const pen = so.querySelector<SVGGElement>('.so-pen'), line = so.querySelector<SVGPathElement>('.so-line'); if (!pen || !line) return;
  const L = line.getTotalLength(); line.style.strokeDasharray = `${L}`;
  const set = (x: number, u: number) => { pen.setAttribute('transform', `translate(${x.toFixed(1)} 0)`); line.style.strokeDashoffset = `${L * (1 - u)}`; };
  if (reduce || !('IntersectionObserver' in window)) { set(320, 1); so.classList.add('signed'); return; }
  set(0, 0);
  const WRITE = 1900, PAUSE = 120, LINE = 650; // ms
  const ease = (x: number) => x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const run = () => { so.classList.add('signed'); const t0 = performance.now();
    const frame = (now: number) => { const e = now - t0;
      const w = Math.min(1, e / WRITE), u = Math.min(1, Math.max(0, (e - WRITE - PAUSE) / LINE));
      set(320 * ease(w), ease(u)); if (e < WRITE + PAUSE + LINE) requestAnimationFrame(frame); };
    requestAnimationFrame(frame); };
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); run(); } }, { threshold: 0.6 });
  io.observe(so);
})();

// Essays: a thin progress bar showing how far through you are (goal-gradient effect).
(() => {
  const bar = document.querySelector<HTMLElement>('.read-progress i'); const art = document.querySelector<HTMLElement>('article');
  if (!bar || !art) return;
  let ticking = false;
  const update = () => { ticking = false; const r = art.getBoundingClientRect(); const total = r.height - innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1; bar.style.transform = `scaleX(${p.toFixed(4)})`; };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update); update();
})();
