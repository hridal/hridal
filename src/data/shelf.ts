// Books and films on the Shelf. Add new ones at the top of each list.
// status: books 'read' | 'reading', films 'watched' | 'watching'.
// rating: 1-5 (half stars like 3.5 are fine). Leave it out while you're still reading or watching.
// cover: pick any colour for the book's cloth cover.
export type Book = { id: string; title: string; author: string; status: 'read' | 'reading'; rating?: number; review?: string; cover?: string };
export type Film = { id: string; title: string; year?: string; where?: string; kind?: 'film' | 'series'; status: 'watched' | 'watching'; rating?: number; review?: string };

export const books: Book[] = [
  { id: 'brave-new-world', title: 'Brave New World', author: 'Aldous Huxley', status: 'reading', cover: '#6c202d',
    review: 'Reading it now. Strange how much of it feels like a description of the present rather than a warning about the future.' },
];

export const films: Film[] = [
  { id: 'the-mentalist', title: 'The Mentalist', where: 'Netflix', kind: 'series', status: 'watching',
    review: 'Watching it now. Patrick Jane reading people is the whole reason to keep going.' },
];
