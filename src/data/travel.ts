// Places on the Travel globe.
// To add a place: copy a block, change the name, country and coordinates (right-click any spot on Google Maps to copy them).
// To add photos: put the image files in public/travel/ and list their file names under `photos`, e.g. photos: ['london-1.jpg'].
export type Place = { name: string; country: string; lat: number; lng: number; when?: string; note?: string; photos: string[] };

export const places: Place[] = [
  { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, when: "Home for uni", note: "Where I study, at Imperial.", photos: [] },
  { name: "Reading", country: "United Kingdom", lat: 51.4543, lng: -0.9781, when: "Home", note: "", photos: [] },
  { name: "Prague", country: "Czechia", lat: 50.0755, lng: 14.4378, when: "", note: "", photos: [] },
  { name: "Tivat", country: "Montenegro", lat: 42.43, lng: 18.696, when: "", note: "", photos: [] },
  { name: "Kotor", country: "Montenegro", lat: 42.4247, lng: 18.7712, when: "", note: "", photos: [] },
  { name: "Podgorica", country: "Montenegro", lat: 42.4304, lng: 19.2594, when: "", note: "", photos: [] },
  { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, when: "", note: "", photos: [] },
  { name: "Bergen", country: "Norway", lat: 60.3913, lng: 5.3221, when: "", note: "", photos: [] },
  { name: "Olden", country: "Norway", lat: 61.8378, lng: 6.8064, when: "", note: "", photos: [] },
  { name: "Sandane", country: "Norway", lat: 61.7744, lng: 6.2153, when: "", note: "", photos: [] },
  { name: "M\u00e1laga", country: "Spain", lat: 36.7213, lng: -4.4214, when: "", note: "", photos: [] },
  { name: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686, when: "", note: "", photos: [] },
  { name: "Gran Canaria", country: "Spain", lat: 27.9202, lng: -15.5474, when: "Canary Islands", note: "", photos: [] },
  { name: "Fuerteventura", country: "Spain", lat: 28.3587, lng: -14.0537, when: "Canary Islands", note: "", photos: [] },
  { name: "Tenerife", country: "Spain", lat: 28.2916, lng: -16.6291, when: "Canary Islands", note: "", photos: [] },
  { name: "Lanzarote", country: "Spain", lat: 29.0469, lng: -13.59, when: "Canary Islands", note: "", photos: [] },
  { name: "Albufeira", country: "Portugal", lat: 37.0891, lng: -8.2479, when: "", note: "", photos: [] },
  { name: "Gibraltar", country: "Gibraltar", lat: 36.1408, lng: -5.3536, when: "", note: "", photos: [] },
  { name: "Agadir", country: "Morocco", lat: 30.4278, lng: -9.5981, when: "", note: "", photos: [] },
  { name: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811, when: "", note: "", photos: [] },
  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777, when: "", note: "", photos: [] },
  { name: "Gujarat", country: "India", lat: 23.0225, lng: 72.5714, when: "", note: "", photos: [] },
  { name: "Indore", country: "India", lat: 22.7196, lng: 75.8577, when: "", note: "", photos: [] },
  { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946, when: "", note: "", photos: [] },
];
