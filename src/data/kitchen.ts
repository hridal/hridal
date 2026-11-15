// The Kitchen tab. Edit freely.
// `where` codes: any = any supermarket, world = world foods aisle or an Indian/Asian grocer, fresh = fruit & veg aisle or market.
export const whereLabels: Record<string, string> = {
  any: 'Any supermarket',
  world: 'World foods aisle, or an Indian / Asian grocer',
  fresh: 'Fruit & veg aisle, or a local market',
  chilled: 'Chilled aisle (near the cheese / tofu)',
};

// Your favourite weeknight meals. Their `id`s match recipes below, so each card opens the full recipe.
export const favourites = ['chana-masala', 'pesto-gnocchi-traybake', 'black-bean-tacos', 'paneer-tikka-wraps'];

export type Recipe = {
  id: string; name: string; blurb: string; minutes: number; serves: number;
  mood: string[]; protein: string;
  ingredients: { item: string; where: string }[];
  steps: string[];
};

export const moods = [
  { id: 'quick', label: 'Something quick' },
  { id: 'comfort', label: 'Comfort food' },
  { id: 'protein', label: 'High protein' },
  { id: 'light', label: 'Light & fresh' },
  { id: 'indian', label: 'Indian' },
  { id: 'italian', label: 'Italian' },
  { id: 'asian', label: 'East Asian' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'batch', label: 'Good for meal prep' },
];

export const recipes: Recipe[] = [
  { id: 'chana-masala', name: 'One-pot chana masala', blurb: 'Spiced chickpeas in a rich tomato and onion sauce.', minutes: 30, serves: 3,
    mood: ['indian','comfort','protein','batch'], protein: 'Chickpeas',
    ingredients: [
      { item: '2 tins chickpeas', where: 'any' }, { item: '1 tin chopped tomatoes', where: 'any' },
      { item: '1 onion, 3 garlic cloves, thumb of ginger', where: 'fresh' }, { item: '1 tsp each cumin seeds, garam masala, ground coriander, turmeric', where: 'world' },
      { item: '1 green chilli, fresh coriander, lemon', where: 'fresh' }, { item: 'Rice or rotis to serve', where: 'any' } ],
    steps: ['Fry cumin seeds in oil, then the chopped onion until golden.', 'Add garlic, ginger, chilli and the ground spices for a minute.', 'Tip in tomatoes and simmer 10 minutes.', 'Add drained chickpeas with a splash of water and simmer 10 more. Finish with lemon and coriander.'] },
  { id: 'pesto-gnocchi-traybake', name: 'Pesto gnocchi traybake', blurb: 'Crispy gnocchi, roasted veg, one tray, almost no washing up.', minutes: 30, serves: 2,
    mood: ['italian','quick','comfort'], protein: 'Mozzarella',
    ingredients: [
      { item: '500g pack gnocchi', where: 'chilled' }, { item: 'Cherry tomatoes, a courgette, a red onion', where: 'fresh' },
      { item: '3 tbsp green pesto (check it’s vegetarian, without Parmesan)', where: 'any' }, { item: '1 ball mozzarella', where: 'chilled' },
      { item: 'Handful of spinach', where: 'fresh' } ],
    steps: ['Heat oven to 220°C.', 'Toss gnocchi and chopped veg in oil on a tray; roast 20 minutes.', 'Stir through pesto and spinach, tear over mozzarella, roast 5 more minutes.'] },
  { id: 'black-bean-tacos', name: 'Smoky black bean tacos', blurb: 'Crispy spiced beans, quick pickled onions, lime crema.', minutes: 20, serves: 2,
    mood: ['mexican','quick','protein'], protein: 'Black beans',
    ingredients: [
      { item: '1 tin black beans', where: 'any' }, { item: '1 tsp smoked paprika, 1 tsp cumin', where: 'any' },
      { item: 'Small tortillas', where: 'any' }, { item: '1 red onion, 2 limes, an avocado, coriander', where: 'fresh' },
      { item: 'Greek yoghurt or soured cream', where: 'chilled' } ],
    steps: ['Thinly slice the onion and squeeze over a lime with a pinch of salt; leave to pickle.', 'Fry drained beans with the spices until they crisp up a little; lightly mash some.', 'Mix yoghurt with lime juice.', 'Warm tortillas and pile up beans, avocado, onions, crema and coriander.'] },
  { id: 'paneer-tikka-wraps', name: 'Paneer tikka wraps', blurb: 'Charred spiced paneer with mint yoghurt and crunchy salad.', minutes: 25, serves: 2,
    mood: ['indian','protein','quick'], protein: 'Paneer',
    ingredients: [
      { item: '225g block paneer', where: 'chilled' }, { item: '2 tbsp tikka paste', where: 'world' },
      { item: 'Greek yoghurt', where: 'chilled' }, { item: 'Mint, cucumber, red onion, lettuce, a pepper', where: 'fresh' },
      { item: 'Wraps or naan', where: 'any' } ],
    steps: ['Cube paneer and pepper; coat in tikka paste and a spoon of yoghurt.', 'Fry or grill on high heat until charred, about 8 minutes.', 'Mix remaining yoghurt with chopped mint.', 'Fill wraps with salad, paneer and mint yoghurt.'] },
  { id: 'tofu-stir-fry', name: 'Sticky sesame tofu stir-fry', blurb: 'Crispy tofu in a sweet, salty, garlicky glaze.', minutes: 25, serves: 2,
    mood: ['asian','protein','quick'], protein: 'Tofu',
    ingredients: [
      { item: '280g block firm tofu', where: 'chilled' }, { item: '1 tbsp cornflour', where: 'any' },
      { item: '3 tbsp soy sauce, 1 tbsp honey or maple syrup, 1 tbsp rice vinegar', where: 'world' },
      { item: 'Garlic, ginger, broccoli, a pepper, spring onions', where: 'fresh' }, { item: 'Sesame seeds, rice or noodles', where: 'any' } ],
    steps: ['Press the tofu dry, cube it and toss in cornflour.', 'Fry until golden on all sides; set aside.', 'Stir-fry veg with garlic and ginger for 4 minutes.', 'Add sauce, return tofu, toss until sticky. Top with sesame and spring onion.'] },
  { id: 'red-lentil-dal', name: 'Coconut red lentil dal', blurb: 'Creamy, gentle and cheap. Better the next day.', minutes: 30, serves: 4,
    mood: ['indian','comfort','batch','protein'], protein: 'Red lentils',
    ingredients: [
      { item: '250g red lentils', where: 'any' }, { item: '1 tin coconut milk', where: 'any' },
      { item: '1 onion, garlic, ginger, spinach', where: 'fresh' }, { item: '1 tsp each turmeric, cumin, garam masala; mustard seeds', where: 'world' },
      { item: 'Vegetable stock cube', where: 'any' } ],
    steps: ['Soften onion, garlic and ginger in oil with the spices.', 'Add rinsed lentils, coconut milk and 500ml stock.', 'Simmer 20 minutes, stirring, until soft and thick.', 'Wilt in spinach. Optional: top with mustard seeds sizzled in oil.'] },
  { id: 'halloumi-couscous', name: 'Halloumi & roasted veg couscous', blurb: 'Salty halloumi, sweet roast veg, lemony herby couscous.', minutes: 30, serves: 2,
    mood: ['light','protein','batch'], protein: 'Halloumi',
    ingredients: [
      { item: '1 block halloumi', where: 'chilled' }, { item: 'Couscous', where: 'any' },
      { item: 'A pepper, courgette, red onion, lemon, parsley or mint', where: 'fresh' }, { item: 'Pomegranate seeds (optional)', where: 'fresh' } ],
    steps: ['Roast chopped veg at 200°C for 25 minutes.', 'Pour boiling stock over couscous, cover for 5 minutes, then fluff with lemon and herbs.', 'Fry sliced halloumi until golden.', 'Pile it all together; scatter pomegranate.'] },
  { id: 'mushroom-risotto', name: 'Easy oven mushroom risotto', blurb: 'All the comfort, none of the stirring.', minutes: 40, serves: 3,
    mood: ['italian','comfort'], protein: 'Cheese',
    ingredients: [
      { item: '250g risotto rice', where: 'any' }, { item: '250g mushrooms, an onion, garlic, thyme', where: 'fresh' },
      { item: '750ml vegetable stock', where: 'any' }, { item: 'Vegetarian hard cheese (most Parmesan isn’t vegetarian)', where: 'chilled' },
      { item: 'Knob of butter', where: 'chilled' } ],
    steps: ['Heat oven to 200°C. Soften onion, garlic and mushrooms in an ovenproof pan.', 'Stir in rice, then pour in hot stock. Cover and bake 25 minutes.', 'Stir hard with butter and grated cheese until creamy.'] },
  { id: 'greek-salad-bowl', name: 'Big Greek chickpea salad', blurb: 'Crunchy, fresh and filling enough for dinner.', minutes: 10, serves: 2,
    mood: ['light','quick','protein','batch'], protein: 'Chickpeas & feta',
    ingredients: [
      { item: '1 tin chickpeas', where: 'any' }, { item: 'Feta', where: 'chilled' },
      { item: 'Cucumber, tomatoes, red onion, a pepper', where: 'fresh' }, { item: 'Kalamata olives, olive oil, red wine vinegar, oregano', where: 'any' } ],
    steps: ['Chop the veg into chunks.', 'Add drained chickpeas, olives and crumbled feta.', 'Dress with oil, vinegar, oregano, salt and pepper.'] },
  { id: 'veggie-chilli', name: 'Sweet potato & bean chilli', blurb: 'Freezer-friendly, warming, makes loads.', minutes: 45, serves: 4,
    mood: ['mexican','comfort','batch','protein'], protein: 'Beans',
    ingredients: [
      { item: '2 tins mixed beans, 1 tin chopped tomatoes', where: 'any' }, { item: '2 sweet potatoes, an onion, a pepper, garlic', where: 'fresh' },
      { item: '1 tsp each cumin, smoked paprika, chilli powder', where: 'any' }, { item: 'Rice, yoghurt and coriander to serve', where: 'any' } ],
    steps: ['Soften onion, pepper and garlic with the spices.', 'Add cubed sweet potato, beans, tomatoes and a tin of water.', 'Simmer 30 minutes until the potato is soft and the chilli thick.'] },
  { id: 'peanut-noodles', name: 'Cold peanut sesame noodles', blurb: 'Great for packed lunches the next day.', minutes: 15, serves: 2,
    mood: ['asian','quick','light','batch'], protein: 'Edamame & peanuts',
    ingredients: [
      { item: 'Noodles (soba or egg-free)', where: 'world' }, { item: '2 tbsp peanut butter, 2 tbsp soy sauce, 1 tbsp rice vinegar, 1 tsp sesame oil', where: 'any' },
      { item: 'Frozen edamame', where: 'any' }, { item: 'Cucumber, carrot, spring onion, lime', where: 'fresh' } ],
    steps: ['Cook noodles and edamame; rinse under cold water.', 'Whisk the sauce with a splash of hot water until smooth.', 'Toss everything with shredded veg; finish with lime.'] },
  { id: 'shakshuka', name: 'Spiced shakshuka', blurb: 'Eggs baked in peppery tomato sauce. Dinner in one pan.', minutes: 25, serves: 2,
    mood: ['comfort','quick','protein'], protein: 'Eggs',
    ingredients: [
      { item: '4 eggs', where: 'any' }, { item: '1 tin chopped tomatoes', where: 'any' },
      { item: 'An onion, a red pepper, garlic, parsley', where: 'fresh' }, { item: '1 tsp cumin, 1 tsp paprika, chilli flakes', where: 'any' },
      { item: 'Crusty bread, feta (optional)', where: 'any' } ],
    steps: ['Soften onion, pepper and garlic with the spices.', 'Add tomatoes and simmer 8 minutes.', 'Make wells, crack in the eggs, cover and cook 6–8 minutes until set.', 'Scatter herbs and feta; mop up with bread.'] },
];
