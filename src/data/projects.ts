// Projects shown on /projects and in the quick-jump menu.
// `art` picks the halftone illustration drawn on the card (see projects/index.astro).
export const projects = [
  { href: '/projects/portfolio-dashboard', title: 'Portfolio risk dashboard', kind: 'Personal project, Oct 2026 to now', art: 'chart',
    text: 'A dashboard I built before I started investing, to see how the portfolios I was considering behave in a crash, what fees and inflation really cost, and to keep a record of my decisions. It checks its own data and rebuilds itself every weekday.' },
  { href: '/projects/jewellness', title: 'Jewellness', kind: 'Start-up, Oct 2026 to now', art: 'bracelet',
    text: 'Fitness jewellery for women: a halo bracelet that tracks sleep, heart health and your cycle, with every sensor hidden in the clasp. I came up with the idea, ran the customer interviews and built the market sizing and financial model.' },
  { href: '/projects/materials-ml', title: 'Materials property predictor', kind: 'Personal project, started Oct 2025', art: 'lattice',
    text: 'A model that predicts whether a compound is a metal and estimates its band gap from the chemical formula alone, trained on nearly 5,000 real compounds. It reaches 91.9% accuracy on metal or non-metal, and you can try it in the live app.' },
];
