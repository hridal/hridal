// Site-wide motion. One orchestrated moment (the homepage entrance), quiet
// line reveals for big headings, and motion that answers what you do
// (logo wave on hover, magnetic buttons). Everything is skipped when the
// visitor has asked their device for reduced motion.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function smoothScroll() {
  // Areas that scroll on their own (laptop screen, globe zoom, recipe panel) opt out.
  document.querySelectorAll('.screen, #globe, .place-panel, .np-page').forEach(el => el.setAttribute('data-lenis-prevent', ''));
  const lenis = new Lenis({ duration: 0.9, easing: (t: number) => 1 - Math.pow(1 - t, 3), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Keep in-page jumps (like the recipe scrolling into view) smooth too.
  (window as any).__lenis = lenis;
}

function homeEntrance() {
  const intro = document.querySelector('.intro');
  if (!intro) return;
  const name = intro.querySelector('h1');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (name) {
    const split = new SplitText(name, { type: 'chars', charsClass: 'ch' });
    gsap.set(name, { opacity: 1 });
    tl.from(split.chars, { yPercent: 70, opacity: 0, rotate: -6, duration: 1.1, stagger: 0.055 });
  }
  const card = intro.querySelector('.name-card');
  if (card) {
    tl.from(card, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power2.inOut' }, '-=0.6');
    tl.from(card.children, { opacity: 0, y: 6, duration: 0.5, stagger: 0.06 }, '-=0.5');
  }
  const tagline = intro.querySelector('.tagline');
  if (tagline) {
    const lines = new SplitText(tagline, { type: 'lines', linesClass: 'ln' });
    tl.from(lines.lines, { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.4');
  }
  const actions = intro.querySelector('.actions');
  if (actions) tl.from(actions.children, { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 }, '-=0.4');
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
  headingReveals();
  logoWave();
  magneticButtons();
}

// Wait for the fonts, so text is split at its real width.
let started = false;
const go = () => { if (!started) { started = true; start(); } };
if (document.fonts && document.fonts.ready) { document.fonts.ready.then(go); setTimeout(go, 600); } else go();
