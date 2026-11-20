// Small line drawings for each book and film on the Shelf (viewBox 0 0 100 100, drawn with stroke only).
// Original illustrations of ideas from each story, not copies of any cover or poster.
export const motifs: Record<string, string> = {
  // test tubes in a rack
  'brave-new-world': `<path d="M30 20v52a8 8 0 0 0 16 0V20M54 20v52a8 8 0 0 0 16 0V20M24 20h52M18 58h64M22 58v26M78 58v26"/><circle cx="38" cy="66" r="2.5"/><circle cx="62" cy="62" r="2"/><circle cx="60" cy="72" r="3"/>`,
  // two faces turned away from each other
  'the-divided-self': `<path d="M46 14c-14 0-20 10-20 20l-5 9 5 2v8c0 4 3 6 7 6h3v13c0 8 4 14 10 14M54 14c14 0 20 10 20 20l5 9-5 2v8c0 4-3 6-7 6h-3v13c0 8-4 14-10 14"/><path d="M50 10v80" stroke-dasharray="3 5"/>`,
  // an open book on a desk with a lamp
  'stoner': `<path d="M14 70c12-6 24-6 36 2 12-8 24-8 36-2V36c-12-6-24-6-36 2-12-8-24-8-36-2zM50 38v34M8 82h84"/><path d="M22 46c8-3 14-3 20 1M22 54c8-3 14-3 20 1M58 47c6-4 12-4 20-1M58 55c6-4 12-4 20-1"/>`,
  // a cat under a crescent moon
  'the-master-and-margarita': `<path d="M74 12a14 14 0 1 0 12 22 11 11 0 1 1-12-22z"/><path d="M36 88c-10 0-14-8-12-18 2-10 8-16 8-24l-4-12 8 6h8l8-6-4 12c0 8 6 14 8 24 2 10-2 18-12 18zM58 86c10 0 14-6 12-12"/><circle cx="38" cy="44" r="1.5"/><circle cx="46" cy="44" r="1.5"/>`,
  // a beetle
  'the-metamorphosis': `<ellipse cx="50" cy="58" rx="18" ry="24"/><path d="M50 34v48M38 30a12 10 0 0 1 24 0zM44 24l-8-12M56 24l8-12M32 46l-14-6M32 58l-16 2M34 70l-12 10M68 46l14-6M68 58l16 2M66 70l12 10"/>`,
  // a crescent moon over a bridge and a street lamp
  'white-nights': `<path d="M66 12a13 13 0 1 0 12 20 10 10 0 1 1-12-20z"/><path d="M6 76c14-22 30-22 44 0 14-22 30-22 44 0M6 76h88M24 76V58M24 58h6l-3-6-3 6M18 90c8-3 16-3 24 0M56 90c8-3 16-3 24 0"/>`,
  // a top hat with a spark of electricity
  'the-prestige': `<path d="M30 62V24c0-4 40-4 40 0v38M30 50h40M18 66c10 6 54 6 64 0-6-4-58-4-64 0z"/><path d="M80 18l-8 12h8l-8 12" stroke-linejoin="bevel"/><path d="M14 30l6 4M12 42h7"/>`,
  // rain falling over a large seven
  'se7en': `<path d="M30 30h40L46 86"/><path d="M14 10l-4 12M26 6l-4 12M80 10l-4 12M90 30l-4 12M18 46l-4 12M84 56l-4 12M12 76l-4 12M74 80l-4 12"/>`,
  // a grid of cipher symbols
  'zodiac': `<path d="M12 12h76v76H12zM12 37h76M12 62h76M37 12v76M62 12v76"/><path d="M18 30l6-12 6 12zM49 18v14M43 25h12M68 20h14v10H68zM24 40v16M18 48h12"/><circle cx="49" cy="49" r="6"/><path d="M70 44l10 10M80 44l-10 10M18 70l12 12M30 70v12M43 76h12M49 70l6 12M68 68h14M75 68v14"/>`,
  // a rock hammer beside a barred window
  'the-shawshank-redemption': `<path d="M50 14h36v44H50zM59 14v44M68 14v44M77 14v44"/><path d="M16 88l26-36M32 46l18 12-4 4-16-10z"/><path d="M8 92h84"/>`,
  // a cup of tea on a saucer
  'the-mentalist': `<path d="M24 46h46v12c0 14-10 22-23 22s-23-8-23-22zM70 52h6a8 8 0 0 1 0 16h-8M14 84c20 6 52 6 72 0"/><path d="M38 38c-4-6 4-8 0-16M50 38c-4-6 4-8 0-16"/>`,
};
