// Books and films on the Shelf. Add new ones at the top of each list.
// status: books 'read' | 'reading', films 'watched' | 'watching'.
// rating: 1-5 (half stars like 3.5 are fine). Leave it out while you're still reading or watching.
// cover: pick any colour for the book's cloth cover.
export type Book = { id: string; title: string; author: string; status: 'read' | 'reading'; rating?: number; review?: string; cover?: string };
export type Film = { id: string; title: string; year?: string; where?: string; kind?: 'film' | 'series'; status: 'watched' | 'watching'; rating?: number; review?: string };

export const books: Book[] = [
  { id: 'the-divided-self', title: 'The Divided Self', author: 'R. D. Laing', status: 'read', cover: '#2f4a5c',
    review: 'A fascinating read, because it makes you see psychosis as an understandable human survival mechanism in an overwhelming world.' },
  { id: 'stoner', title: 'Stoner', author: 'John Williams', status: 'read', cover: '#8a6a3f',
    review: 'I was completely moved by a story where almost nothing dramatic happens, simply because the prose captures the dignity of an ordinary, unfulfilled life so honestly.' },
  { id: 'the-master-and-margarita', title: 'The Master and Margarita', author: 'Mikhail Bulgakov', status: 'read', cover: '#1f1f2e',
    review: 'I loved how chaotic and wildly inventive it felt, balancing hilarious satire of Soviet bureaucracy with a surprisingly haunting, philosophical retelling of Pontius Pilate.' },
  { id: 'the-metamorphosis', title: 'The Metamorphosis', author: 'Franz Kafka', status: 'read', cover: '#4f5d3a',
    review: 'Brilliant and unsettling. Turning a man into a giant bug is an unexpected way to show how quickly family love can dry up the moment you stop being useful, and somehow it works.' },
  { id: 'white-nights', title: 'White Nights', author: 'Fyodor Dostoevsky', status: 'read', cover: '#5e4a78',
    review: 'Beautifully captures the ache of being a lonely overthinker who falls completely in love over a few fleeting conversations, even when he knows it won\u2019t last.' },
  { id: 'brave-new-world', title: 'Brave New World', author: 'Aldous Huxley', status: 'reading', cover: '#6c202d',
    review: 'Reading it now. Strange how much of it feels like a description of the present rather than a warning about the future.' },
];

export const films: Film[] = [
  { id: 'the-mentalist', title: 'The Mentalist', where: 'Netflix', kind: 'series', status: 'watching',
    review: 'Watching it now. Patrick Jane reading people is the whole reason to keep going.' },
];
