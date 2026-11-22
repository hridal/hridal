// Books and films on the Shelf. Add new ones at the top of each list.
// status: books 'read' | 'reading', films 'watched' | 'watching'.
// rating: 1-5 (half stars like 3.5 are fine). Leave it out while you're still reading or watching.
// cover: pick any colour for the book's cloth cover.
export type Book = { id: string; title: string; author: string; status: 'read' | 'reading'; rating?: number; review?: string; cover?: string };
export type Film = { id: string; title: string; year?: string; where?: string; kind?: 'film' | 'series'; status: 'watched' | 'watching'; rating?: number; review?: string };

export const books: Book[] = [
  { id: 'the-divided-self', title: 'The Divided Self', author: 'R. D. Laing', status: 'read', rating: 4, cover: '#2f4a5c',
    review: 'A fascinating read, because it makes you see psychosis as an understandable human survival mechanism in an overwhelming world.' },
  { id: 'stoner', title: 'Stoner', author: 'John Williams', status: 'read', rating: 4.5, cover: '#8a6a3f',
    review: 'I was completely moved by a story where almost nothing dramatic happens, simply because the prose captures the dignity of an ordinary, unfulfilled life so honestly.' },
  { id: 'the-master-and-margarita', title: 'The Master and Margarita', author: 'Mikhail Bulgakov', status: 'read', rating: 3.5, cover: '#1f1f2e',
    review: 'Chaotic and wildly inventive. Sharp satire of Soviet bureaucracy, with a surprisingly haunting retelling of Pontius Pilate running through it.' },
  { id: 'the-metamorphosis', title: 'The Metamorphosis', author: 'Franz Kafka', status: 'read', rating: 3.5, cover: '#4f5d3a',
    review: 'Brilliant and unsettling. Turning a man into a giant bug is an unexpected way to show how quickly a family\u2019s love can turn to resentment the moment you stop being useful, and somehow it works.' },
  { id: 'white-nights', title: 'White Nights', author: 'Fyodor Dostoevsky', status: 'read', rating: 4, cover: '#5e4a78',
    review: 'Beautifully captures the ache of being a lonely overthinker who falls completely in love over a few fleeting conversations, even when he knows it won\u2019t last.' },
  { id: 'brave-new-world', title: 'Brave New World', author: 'Aldous Huxley', status: 'reading', cover: '#6c202d',
    review: 'Reading it now. Strange how much of it feels like a description of the present rather than a warning about the future.' },
];

export const films: Film[] = [
  { id: 'the-prestige', title: 'The Prestige', year: '2006', kind: 'film', status: 'watched', rating: 4,
    review: 'Endlessly rewatchable. The whole film is structured like a magic trick, hiding clues in plain sight while two rival magicians go further and further to destroy each other.' },
  { id: 'se7en', title: 'Se7en', year: '1995', kind: 'film', status: 'watched', rating: 4,
    review: 'One of the bleakest, most gripping thrillers I\u2019ve seen. The constant rain and sharp pacing build to an ending that stays with you long after the credits.' },
  { id: 'zodiac', title: 'Zodiac', year: '2007', kind: 'film', status: 'watched', rating: 4,
    review: 'I loved how it turns the usual serial-killer film on its head. It pulls you in with slow, obsessive detail and shows how chasing an unsolvable mystery slowly ruins everyone involved.' },
  { id: 'the-shawshank-redemption', title: 'The Shawshank Redemption', year: '1994', kind: 'film', status: 'watched', rating: 4,
    review: 'A deeply moving classic that earns every bit of its ending, turning decades of quiet friendship inside a brutal prison into a story about holding onto hope.' },
  { id: 'the-mentalist', title: 'The Mentalist', where: 'Netflix', kind: 'series', status: 'watching',
    review: 'Watching it now. Patrick Jane reading people is the whole reason to keep going.' },
];
