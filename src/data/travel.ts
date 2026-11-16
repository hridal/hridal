// Places on the Travel globe.
// To add a place: copy a block, change the name, country and coordinates (right-click any spot on Google Maps to copy them).
// To add photos: put the image files in public/travel/ and list their file names under `photos`, e.g. photos: ['london-1.jpg'].
export type Place = { name: string; country: string; lat: number; lng: number; when?: string; note?: string; photos: string[] };

export const places: Place[] = [
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, when: 'Home for uni', note: 'Where I study, at Imperial.', photos: [] },
  { name: 'Reading', country: 'United Kingdom', lat: 51.4543, lng: -0.9781, when: 'Home', note: '', photos: [] },
];
