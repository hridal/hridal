// Site-wide motion. One orchestrated moment (the homepage entrance), quiet
// line reveals for big headings, and motion that answers what you do
// (logo wave on hover, magnetic buttons). Everything is skipped when the
// visitor has asked their device for reduced motion.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function smoothScroll() {
  // Native scrolling: smoother on phones and trackpads than a JS scroll layer.
  document.documentElement.style.scrollBehavior = 'smooth';
  (window as any).__lenis = { scrollTo: (t: any, o: any = {}) => {
    const el = typeof t === 'string' ? document.querySelector(t) : t;
    if (el && el.getBoundingClientRect) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + (o.offset || 0), behavior: 'smooth' });
    else if (typeof t === 'number') window.scrollTo({ top: t, behavior: 'smooth' });
  } };
}

function homeEntrance() {
  const intro = document.querySelector('.intro');
  if (!intro) return;
  const name = intro.querySelector('h1');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (name) {
    const first = name.querySelector('.first') || name;
    const sur = name.querySelector<HTMLElement>('.sur');
    const dot = name.querySelector<HTMLElement>('.dot');
    const split = new SplitText(first, { type: 'chars', charsClass: 'ch' });
    gsap.set(name, { opacity: 1 });
    tl.from(split.chars, { yPercent: 70, opacity: 0, rotate: -6, duration: 1.1, stagger: 0.055 });
    if (sur) {
      if (window.matchMedia('(min-width: 761px)').matches) {
        // The surname unrolls out of the full stop: the dot gives a small pulse,
        // then slides right as "Gujrati" opens up behind it.
        const w = sur.scrollWidth;
        gsap.set(sur, { width: 0 });
        if (dot) tl.to(dot, { scale: 1.35, duration: 0.22, ease: 'power2.out', transformOrigin: '50% 80%' }, '-=0.25')
                   .to(dot, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, '+=0.02');
        tl.to(sur, { width: w, duration: 1.05, ease: 'power3.inOut', clearProps: 'width' }, '<-0.1')
          .from(sur, { opacity: 0.15, duration: 1.05, ease: 'power3.out', clearProps: 'opacity' }, '<');
      } else {
        // On phones the surname sits on its own line and wipes in from the left.
        tl.from(sur, { clipPath: 'inset(-20% 100% -30% 0)', duration: 0.9, ease: 'power3.inOut', clearProps: 'clipPath' }, '-=0.3');
      }
    }
  }
  const card = intro.querySelector('.name-card');
  if (card) {
    tl.from(card, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power2.inOut' }, '-=0.6');
    tl.from(card.children, { opacity: 0, y: 6, duration: 0.5, stagger: 0.06 }, '-=0.5');
  }
  const tagline = intro.querySelector('.tagline');
  const pulse = intro.querySelector('.pulse');
  if (pulse) pulse.classList.add('draw');
  if (tagline) {
    // Word-by-word reveal: each word sharpens out of a soft blur in turn.
    const words = new SplitText(tagline, { type: 'words', wordsClass: 'wd' });
    gsap.set(tagline, { opacity: 1 });
    tl.from(words.words, { opacity: 0, y: 8, filter: 'blur(6px)', duration: 0.6, stagger: 0.018, clearProps: 'filter,transform' }, '-=0.4');
    // Underline the key words only once the whole welcome has appeared.
    tl.call(() => tagline.classList.add('marks-on'));
  }
  const actions = intro.querySelector('.actions');
  if (actions) tl.from(actions.children, { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 }, '-=0.4');
  const profile = intro.querySelector('.profile');
  if (profile) tl.from(profile, { opacity: 0, y: 16, duration: 0.8, clearProps: 'transform,opacity' }, '-=0.9');
}

function headingReveals() {
  // Section titles rise into place once, as you reach them. Nothing else fades in.
  document.querySelectorAll<HTMLElement>('section.block > h2, .cb-title, article h1').forEach(h => {
    const split = new SplitText(h, { type: 'lines' });
    gsap.from(split.lines, {
      y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });
}

function logoWave() {
  // The little "kawaii" moment: letters of the logo bob in a wave on hover.
  const mark = document.querySelector<HTMLElement>('.mark');
  if (!mark) return;
  const split = new SplitText(mark, { type: 'chars', charsClass: 'mk' });
  let busy = false;
  mark.addEventListener('mouseenter', () => {
    if (busy) return; busy = true;
    gsap.timeline({ onComplete: () => { busy = false; } })
      .to(split.chars, { y: -7, rotate: (i: number) => (i % 2 ? 6 : -6), duration: 0.22, ease: 'power2.out', stagger: 0.04 })
      .to(split.chars, { y: 0, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)', stagger: 0.04 }, 0.18);
  });
}

function magneticButtons() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('.actions .btn, .pk-actions .btn, .pf-btn').forEach(btn => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.25);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  });
}

function start() {
  document.documentElement.classList.add('motion-ready');
  if (reduce) return;
  smoothScroll();
  homeEntrance();
  logoWave();
}

// Wait for the fonts, so text is split at its real width.
let started = false;
const go = () => { if (!started) { started = true; start(); } };
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); setTimeout(go, 600); } else go();


// Highlight the current section in the "on this page" list
(() => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
  if (!links.length) return;
  const map = new Map<Element, HTMLAnchorElement>();
  links.forEach(a => { const t = document.querySelector(a.getAttribute('href')!); if (t) map.set(t, a); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.remove('on')); map.get(e.target)?.classList.add('on'); } });
  }, { rootMargin: '-30% 0px -60% 0px' });
  map.forEach((_, t) => io.observe(t));
})();
