import { Recipe } from '../types';
import { LOCAL_BUNDLED_DISH_IMAGES } from '../utils/foodImageHelper';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'jollof-rice',
    name: 'Jollof Rice',
    category: 'Rice & Grains',
    calories: '450 kcal per serving',
    cooking_time: '45 minutes',
    servings: '4-6 servings',
    difficulty: 'Medium',
    origin: 'West African',
    ingredients: 'Rice, tomatoes, red bell pepper, onions, tomato paste, vegetable oil, chicken or beef stock, curry powder, thyme, bay leaves, salt',
    directions: 'Blend tomatoes, pepper and onion. Fry the blended mix in oil with tomato paste until reduced. Add stock, curry, thyme and bay leaves. Stir in washed rice, cover and simmer on low heat until rice is tender, stirring occasionally to prevent burning.',
    tags: ['Party Favorite', 'Spicy', 'Comfort Food', 'Iconic'],
    referenceImages: ['/dataset/images/Jollof Rice.jpg', '/dataset/images/jollof-rice.jpg', '/images/jollof-rice.jpg'],
    imagePlaceholderColor: 'from-amber-600 to-red-600',
    steps: [
      {
        stepNumber: 1,
        title: 'Blend Fresh Pepper & Aromatic Base',
        instruction: 'Roughly chop tomatoes, red bell peppers (tatashe), scotch bonnet (ata rodo), and yellow onions. Blend with minimal water until a smooth, vibrant puree is achieved.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'blend',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Blending with minimal water prevents prolonged boiling times and concentrates the natural sugars and volatile aromatic compounds in the peppers.',
        visualCue: 'Vibrant orange-red puree with no large vegetable chunks remaining.',
        soundCue: 'High-speed blender hum tapering to a smooth liquid vortex.',
        aromaCue: 'Pungent, sweet bell pepper with sharp peppery heat in the air.',
        stepIngredients: ['Tomatoes (4 large)', 'Red bell peppers (3 medium)', 'Scotch bonnet (2-3 peppers)', 'Yellow onions (2 medium)'],
        tip: 'Remove scotch bonnet seeds if you prefer milder heat without sacrificing fruity aroma.'
      },
      {
        stepNumber: 2,
        title: 'Fry Tomato Paste & Pepper Reduction',
        instruction: 'Heat vegetable oil in a heavy-bottomed pot over medium heat. Fry the concentrated tomato paste for 2 minutes, then pour in the blended pepper puree. Fry until the sauce reduces and clear oil floats to the top.',
        durationSeconds: 480,
        formattedDuration: '8 mins',
        actionType: 'fry',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Cooking tomato paste in hot oil caramelizes sugars and eliminates metallic acidity. Frying the blended base evaporates water so oil-soluble flavor molecules develop fully.',
        visualCue: 'The sauce darkens into a deep rich burgundy red, with glistening oil bubbles separating at the perimeter.',
        soundCue: 'Vigorous popping splatters transitioning into a quiet, continuous oil sizzle.',
        aromaCue: 'Sweet, caramelized roasted aroma replacing raw acidic tomato scent.',
        stepIngredients: ['Vegetable oil (1/2 cup)', 'Tomato paste (100g tube)', 'Blended pepper base'],
        tip: 'Stir regularly with a flat wooden spatula to keep the paste from scorching before it reduces.'
      },
      {
        stepNumber: 3,
        title: 'Infuse Seasonings & Meat Stock',
        instruction: 'Stir in curry powder, dried thyme, bay leaves, seasoning cubes, and salt. Pour in the seasoned rich meat stock and bring the broth to a vigorous rolling boil.',
        durationSeconds: 240,
        formattedDuration: '4 mins',
        actionType: 'boil',
        flameLevel: 'Medium-High',
        scienceWhy: 'Boiling herbs and spices in the presence of lipid (oil) and water extracts both fat-soluble and water-soluble terpenes and essential oils.',
        visualCue: 'Rolling boil with golden-red foam and aromatic bay leaves swirling through the sauce.',
        soundCue: 'Rapid boiling bubbles and steam hissing.',
        aromaCue: 'Intense herbal fragrance combining sweet thyme, pungent curry, and rich beef broth.',
        stepIngredients: ['Curry powder (1 tbsp)', 'Dried thyme (1 tbsp)', 'Bay leaves (3 leaves)', 'Seasoning cubes (2 cubes)', 'Rich meat stock (3 cups)', 'Salt to taste'],
        tip: 'Taste the broth now! It should taste slightly more salty and intense than normal, as the unseasoned rice grains will absorb and dilute the broth.'
      },
      {
        stepNumber: 4,
        title: 'Incorporate Washed Rice & Seal Steam',
        instruction: 'Wash parboiled long-grain rice in warm water until starch is removed and water is crystal clear. Drain and pour directly into the boiling sauce. Stir once gently to distribute, then cover pot with aluminum foil and seal tightly with the lid.',
        durationSeconds: 120,
        formattedDuration: '2 mins',
        actionType: 'prep',
        flameLevel: 'Low Heat',
        scienceWhy: 'Washing off surface amylose prevents clumping. The foil barrier traps 100% of the pressurized steam, forcing moisture deep into the starch granules without requiring excess liquid.',
        visualCue: 'Rice grains submerged evenly just below the liquid level with foil sealed tight.',
        soundCue: 'Muffled bubbling under the airtight foil seal.',
        aromaCue: 'Warm rice starch mingling with spiced tomato broth.',
        stepIngredients: ['Long grain parboiled rice (3 cups, washed)'],
        tip: 'Never add too much water at this stage; trapped steam will cook the rice to perfection.'
      },
      {
        stepNumber: 5,
        title: 'Gentle Low-Heat Steam Simmer',
        instruction: 'Reduce burner flame to the lowest possible setting. Allow the rice to cook in the trapped steam undisturbed for 25 minutes, gently folding the bottom layer over only once at the 15-minute mark.',
        durationSeconds: 1500,
        formattedDuration: '25 mins',
        actionType: 'simmer',
        flameLevel: 'Low Heat',
        scienceWhy: 'Low temperature enables uniform starch gelatinization without rupturing the grain walls, keeping each grain distinct and al dente.',
        visualCue: 'Grains expand, absorbing all red liquid, turning a radiant uniform orange-red.',
        soundCue: 'Faint rhythmic crackle of steam condensation.',
        aromaCue: 'Rich, savory, mouth-watering classic Jollof aroma.',
        stepIngredients: [],
        tip: 'Keep the lid on! Every time you lift the lid, steam escapes and adds 5 minutes to cooking.'
      },
      {
        stepNumber: 6,
        title: 'Party Smoky Bottom Char & Fluff',
        instruction: 'Increase flame to medium for the final 3 minutes until you hear a sharp crackle at the bottom of the pot. Turn off the heat entirely, remove lid, fluff grains with a fork, and let rest 3 minutes before serving.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'rest',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Controlled controlled pyrolysis (bottom caramelization) releases phenolic smoke compounds that infuse the entire pot with authentic West African party jollof flavor.',
        visualCue: 'Separate, glossy, vibrant grains with crispy golden-brown bottom layer.',
        soundCue: 'Rapid crackling and popping from the bottom of the pan.',
        aromaCue: 'Signature campfire smoky party aroma.',
        stepIngredients: ['Butter (1 tbsp, optional for gloss)'],
        tip: 'A dollop of cold butter folded in right as you turn off the heat gives the rice an irresistible glossy sheen.'
      }
    ]
  },
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    category: 'Soups & Stews',
    calories: '520 kcal per serving',
    cooking_time: '1 hour',
    servings: '4-6 servings',
    difficulty: 'Medium',
    origin: 'West African / Nigerian',
    ingredients: 'Ground egusi (melon seeds), palm oil, leafy greens (ugu or spinach), assorted meat, stockfish, crayfish, pepper, onions, seasoning cubes',
    directions: 'Boil the meat and stockfish with onions and seasoning until tender. Heat palm oil, add crayfish and pepper, then fold in the ground egusi in lumps. Add the meat stock gradually, simmer, then stir in the leafy greens and cook for a few more minutes.',
    tags: ['High Protein', 'Rich & Savory', 'Traditional', 'Swallow Pair'],
    referenceImages: ['/dataset/images/Egusi Soup.jpg', '/dataset/images/egusi-soup.jpg', '/images/egusi-soup.jpg'],
    imagePlaceholderColor: 'from-amber-700 to-yellow-600',
    steps: [
      {
        stepNumber: 1,
        title: 'Tenderize & Season Assorted Proteins',
        instruction: 'Place washed beef, tripe (shaki), cow foot, and soaked stockfish in a heavy pot with sliced onions, seasoning cubes, salt, and water. Boil on medium heat until meat is meltingly tender.',
        durationSeconds: 1200,
        formattedDuration: '20 mins',
        actionType: 'boil',
        flameLevel: 'Medium-High',
        scienceWhy: 'Collagen in connective tissues hydrolyzes into gelatin at 70°C+, yielding rich body and mouthfeel to the broth.',
        visualCue: 'Deep golden-brown broth with tender meats and aromatic softened onions.',
        soundCue: 'Steady boiling rumble.',
        aromaCue: 'Deep savory meat and umami-rich stockfish.',
        stepIngredients: ['Assorted beef & tripe (500g)', 'Stockfish head/fillet (100g)', 'Diced onions (1 large)', 'Seasoning cubes (2)', 'Water (3 cups)'],
        tip: 'Reserve every drop of the meat stock; it holds the foundational flavor.'
      },
      {
        stepNumber: 2,
        title: 'Prepare Egusi Paste & Form Lumps',
        instruction: 'Mix ground melon seeds (egusi) with warm water and finely diced onion to form a thick, moldable paste. Let rest for 5 minutes so seeds hydrate.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Hydrating seed proteins creates cohesion, allowing the egusi to cook into distinct, tender cake-like curds rather than dissolving into porridge.',
        visualCue: 'Thick, pale yellow paste resembling soft dough.',
        soundCue: 'Quiet mixing.',
        aromaCue: 'Nutty, fresh melon seed scent.',
        stepIngredients: ['Ground egusi melon seeds (2 cups)', 'Warm water (1/2 cup)', 'Minced onion (1/2 cup)'],
        tip: 'Do not make the paste too watery; thick dough creates the best signature lumps.'
      },
      {
        stepNumber: 3,
        title: 'Bloom Palm Oil & Sear Egusi Curds',
        instruction: 'Heat red palm oil in a pot over medium heat. Do not bleach the oil. Drop tablespoons of egusi paste into the oil. Fry undisturbed for 5 minutes without stirring until curds set firmly.',
        durationSeconds: 420,
        formattedDuration: '7 mins',
        actionType: 'fry',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Coagulating seed albumins in hot oil locks in structure before water is introduced.',
        visualCue: 'Egusi balls puff slightly with crisp golden edges surrounded by ruby palm oil.',
        soundCue: 'Gentle, sizzling fry.',
        aromaCue: 'Fragrant roasted nut and earthy palm oil aroma.',
        stepIngredients: ['Red palm oil (3/4 cup)', 'Egusi paste balls'],
        tip: 'Resist the urge to stir early! Let the curds form solid lumps before touching.'
      },
      {
        stepNumber: 4,
        title: 'Simmer with Stock, Crayfish & Peppers',
        instruction: 'Gently pour in the reserved meat stock, blended scotch bonnet pepper, ground crayfish, and dry fish. Stir carefully around the egusi lumps. Simmer on medium-low heat.',
        durationSeconds: 900,
        formattedDuration: '15 mins',
        actionType: 'simmer',
        flameLevel: 'Medium-Low',
        scienceWhy: 'Simmering ensures the raw egusi seeds are fully cooked and digestible while absorbing the glutamates from crayfish and stockfish.',
        visualCue: 'Lush golden-orange gravy with tender meat pieces and floating egusi curds.',
        soundCue: 'Soft, steady simmer bubbles.',
        aromaCue: 'Rich smokiness from dry fish and intense crayfish umami.',
        stepIngredients: ['Cooked assorted meats', 'Ground crayfish (3 tbsp)', 'Blended pepper (3 tbsp)', 'Deboned dry fish (1 cup)'],
        tip: 'If soup feels too thick, add small splashes of warm water or extra stock.'
      },
      {
        stepNumber: 5,
        title: 'Fold in Fresh Leafy Greens',
        instruction: 'Wash and finely shred fresh ugu (fluted pumpkin leaves) or baby spinach. Stir into the simmering soup. Cook for just 3 minutes to keep greens vibrant, then turn off heat.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'boil',
        flameLevel: 'Low Heat',
        scienceWhy: 'Brief cooking preserves chlorophyll, delicate vitamins, and crisp texture without releasing bitter tannins.',
        visualCue: 'Emerald green leaves woven through golden-red egusi curds.',
        soundCue: 'Subtle simmering.',
        aromaCue: 'Fresh herbal garden freshness lifting the rich soup.',
        stepIngredients: ['Shredded Ugu or Spinach leaves (3 cups)', 'Bitterleaf (optional, 1 tbsp washed)'],
        tip: 'Residual pot heat continues to soften the vegetables after turning off the flame.'
      }
    ]
  },
  {
    id: 'moin-moin',
    name: 'Moin Moin',
    category: 'Legumes & Steamed',
    calories: '280 kcal per serving',
    cooking_time: '50 minutes',
    servings: '6 servings',
    difficulty: 'Medium',
    origin: 'Nigerian / West African',
    ingredients: 'Black-eyed peas or brown beans, red bell pepper, habanero, onions, crayfish, vegetable or palm oil, boiled eggs, flaked fish, seasoning cubes, salt',
    directions: 'Peel beans by soaking and rubbing skins off. Blend beans with peppers, onions and water to a velvety batter. Whisk in oil, crayfish and seasonings. Pour into banana leaves, foil ramekins, or pouches. Add boiled egg slices or fish, then steam in a covered pot for 45 minutes.',
    tags: ['High Protein', 'Gluten Free', 'Steamed', 'Nutritious'],
    referenceImages: ['/dataset/images/Moi moi.jpg', '/dataset/images/moi-moi.jpg', '/images/moi-moi.jpg'],
    imagePlaceholderColor: 'from-amber-600 to-yellow-600',
    steps: [
      {
        stepNumber: 1,
        title: 'Peel & Soak Beans',
        instruction: 'Soak black-eyed peas in warm water for 5 minutes, pulse in a blender or rub between hands to remove seed coats, then rinse repeatedly to float away skins.',
        durationSeconds: 480,
        formattedDuration: '8 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Removing bean skins removes rough insoluble fiber and bitterness, resulting in an ultra-smooth velvety pudding.',
        visualCue: 'Clean, creamy-white skinless bean kernels.',
        soundCue: 'Water sloshing.',
        aromaCue: 'Fresh legume scent.',
        stepIngredients: ['Black-eyed peas (2 cups)'],
        tip: 'Do not soak beans for too long before peeling or skins will stick back to the cotyledons.'
      },
      {
        stepNumber: 2,
        title: 'Blend to Silky Emulsion',
        instruction: 'Blend peeled beans with red bell peppers, scotch bonnets, and onions with warm water until an ultra-fine, silky batter is formed with no graininess.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'blend',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Micro-shearing bean proteins and starches allows them to trap air and moisture during steaming.',
        visualCue: 'Glossy salmon-pink batter pouring like heavy pancake mix.',
        soundCue: 'High-speed blender whine.',
        aromaCue: 'Fruity pepper and sweet onion aroma.',
        stepIngredients: ['Red bell pepper (2)', 'Scotch bonnet (2)', 'Onions (1 large)', 'Warm water (1.5 cups)'],
        tip: 'Test smoothness by rubbing a drop between fingertips; it should feel like heavy cream.'
      },
      {
        stepNumber: 3,
        title: 'Aerate Batter & Season',
        instruction: 'Pour batter into a mixing bowl. Whisk vigorously for 5 minutes with a wooden ladle to incorporate air. Whisk in vegetable oil, crayfish, seasoning cubes, and salt.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Aeration creates tiny air pockets that expand under steam, giving moin moin its signature fluffy, cake-like bounce.',
        visualCue: 'Batter becomes lighter in color, fluffier, and visibly increases in volume.',
        soundCue: 'Rhythmic whacking sound of ladle hitting the bowl.',
        aromaCue: 'Savory crayfish and seasoned spice aroma.',
        stepIngredients: ['Vegetable oil or melted palm oil (1/2 cup)', 'Ground crayfish (2 tbsp)', 'Seasoning cubes (2)', 'Salt (1 tsp)'],
        tip: 'Whisk in one circular direction to build maximum air pockets.'
      },
      {
        stepNumber: 4,
        title: 'Portion & Steam Under Pressure',
        instruction: 'Ladle batter into banana leaves or foil cups. Add boiled egg slices and flaked fish on top. Place in a steamer pot over boiling water, seal tightly, and steam on medium heat.',
        durationSeconds: 2400,
        formattedDuration: '40 mins',
        actionType: 'steam',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Gentle 100°C steam gently sets the legume proteins (globulins) into a firm, moist gel without burning or drying.',
        visualCue: 'Steamer lid puffing rhythmic white steam clouds.',
        soundCue: 'Continuous rolling water boil in base pot.',
        aromaCue: 'Fragrant steamed pudding aroma with sweet banana leaf undertones.',
        stepIngredients: ['Hard-boiled egg slices (2 eggs)', 'Cooked flaked mackerel/fish (1/2 cup)'],
        tip: 'Insert a toothpick in the center; when it comes out clean and warm, moin moin is set.'
      }
    ]
  },
  {
    id: 'suya',
    name: 'Suya',
    category: 'Grilled & Street Food',
    calories: '380 kcal per serving',
    cooking_time: '30 minutes',
    servings: '4 servings',
    difficulty: 'Easy',
    origin: 'Northern Nigerian / Hausa',
    ingredients: 'Beef sirloin or flank steak, suya spice (yaji), peanut powder (kuli kuli), ginger powder, garlic powder, onion powder, paprika, cayenne pepper, vegetable oil, red onions, tomatoes',
    directions: 'Slice beef into thin ribbons. Thread onto soaked skewers. Brush lightly with oil, then generously coat with suya yaji spice. Grill over hot charcoal or in a hot oven for 15-20 minutes, turning once and dusting with extra spice. Serve with sliced onions and tomatoes.',
    tags: ['Street Food Classic', 'Spicy & Smoky', 'High Protein', 'BBQ'],
    referenceImages: ['/dataset/images/Suya.jpg', '/dataset/images/suya.jpg', '/images/suya.jpg'],
    imagePlaceholderColor: 'from-amber-800 to-red-900',
    steps: [
      {
        stepNumber: 1,
        title: 'Slice Beef into Thin Ribbons',
        instruction: 'Using a very sharp chef knife, slice chilled beef against the grain into paper-thin, wide strips (about 2mm thick). Thread onto soaked wooden skewers.',
        durationSeconds: 360,
        formattedDuration: '6 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Slicing thinly against the grain breaks muscle fibers, ensuring ultra-quick cooking and tenderness without chewiness.',
        visualCue: 'Even, paper-thin beef ribbons neatly pleated on skewers.',
        soundCue: 'Knife gliding through beef.',
        aromaCue: 'Clean, chilled beef.',
        stepIngredients: ['Beef sirloin or flank steak (600g)', 'Wooden skewers (soaked in water)'],
        tip: 'Freeze the beef for 20 minutes before slicing to make thin slicing effortless.'
      },
      {
        stepNumber: 2,
        title: 'Oil & Coat with Yaji Peanut Rub',
        instruction: 'Brush beef ribbons lightly with vegetable oil. Generously dredge both sides in authentic Yaji spice blend (roasted peanut kuli-kuli, ginger, garlic, cayenne, and bouillon). Press firmly.',
        durationSeconds: 240,
        formattedDuration: '4 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Peanut powder lipids form an insulating crust that caramelizes into a crispy savory coating while sealing meat juices.',
        visualCue: 'Beef strips completely blanketed in rusty orange-brown textured spice.',
        soundCue: 'Soft dusting.',
        aromaCue: 'Spicy, roasted peanut, earthy ginger and garlic pungency.',
        stepIngredients: ['Yaji spice mix (1/2 cup)', 'Vegetable oil (3 tbsp)'],
        tip: 'Press the spice firmly into the meat with your fingers so it adheres during high heat.'
      },
      {
        stepNumber: 3,
        title: 'High-Heat Char Grill or Broil',
        instruction: 'Place skewers over high charcoal embers or an oven broiler preheated to 220°C (425°F). Grill for 6 minutes, brush with a drop of oil, flip, and grill the other side for 5 minutes until edges are charred.',
        durationSeconds: 660,
        formattedDuration: '11 mins',
        actionType: 'grill',
        flameLevel: 'High Heat',
        scienceWhy: 'Maillard reaction and pyrolysis of peanut oils create the intense, smoky, umami crust signature of West African street suya.',
        visualCue: 'Sizzling charred edges with deep reddish-brown caramelized spice crust.',
        soundCue: 'Hissing fat drippings sizzling on the heat source.',
        aromaCue: 'Hypnotic charcoal BBQ aroma, roasted nuts, and roasted chili smoke.',
        stepIngredients: ['Extra Yaji spice for mid-grill dusting'],
        tip: 'Do not overcook! Thin ribbons cook very rapidly.'
      },
      {
        stepNumber: 4,
        title: 'Rest & Slice with Fresh Aromatics',
        instruction: 'Remove skewers, dust with a final pinch of fresh Yaji spice, and wrap in butcher paper or foil for 3 minutes. Serve alongside thinly sliced red onions and crisp tomatoes.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'rest',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Resting allows internal juices to redistribute evenly throughout the meat ribbons.',
        visualCue: 'Glistening tender suya strips alongside crisp purple onion rings and scarlet tomatoes.',
        soundCue: 'Gentle sizzle dying down.',
        aromaCue: 'Sharp raw onion and hot peppery beef.',
        stepIngredients: ['Red onion (1 sliced into rings)', 'Ripe tomatoes (2 sliced)', 'Fresh cabbage or cucumber slices'],
        tip: 'Eating a slice of raw red onion with every bite balances the spicy peanut heat.'
      }
    ]
  },
  {
    id: 'pounded-yam',
    name: 'Pounded Yam',
    category: 'Swallows & Tubers',
    calories: '340 kcal per serving',
    cooking_time: '35 minutes',
    servings: '4 servings',
    difficulty: 'Medium',
    origin: 'West African / Nigerian',
    ingredients: 'White puna yam tuber, water, pinch of salt (optional)',
    directions: 'Peel yam and cut into thick cubes. Wash thoroughly. Boil in salted water until fork-tender and soft. Transfer into a traditional mortar or food processor. Pound or knead vigorously, adding hot yam water incrementally, until stretchy, smooth, and lump-free.',
    tags: ['Swallow', 'Staple', 'Comfort Food', 'Traditional'],
    referenceImages: ['/dataset/images/Pounded yam.jpg', '/dataset/images/pounded-yam.jpg', '/images/pounded-yam.jpg'],
    imagePlaceholderColor: 'from-amber-100 to-stone-300',
    steps: [
      {
        stepNumber: 1,
        title: 'Peel & Cube White Yam',
        instruction: 'Cut white puna yam into 1-inch thick rounds, peel off dark skin, and slice into equal cubes. Rinse thoroughly in clean cold water.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Uniform cube sizing guarantees all pieces cook through at the exact same rate, preventing hard ungelatinized cores.',
        visualCue: 'Pristine, milky-white yam cubes.',
        soundCue: 'Crisp chopping knife on wooden board.',
        aromaCue: 'Fresh earthy tuber scent.',
        stepIngredients: ['White puna yam tuber (1 medium, ~1kg)'],
        tip: 'Wash hands immediately after peeling to avoid natural yam skin itching.'
      },
      {
        stepNumber: 2,
        title: 'Boil Yam Until Fork Tender',
        instruction: 'Place yam cubes in a pot, cover with water, add a pinch of salt, and boil vigorously on high heat until a fork pierces the center with zero resistance.',
        durationSeconds: 1200,
        formattedDuration: '20 mins',
        actionType: 'boil',
        flameLevel: 'High Heat',
        scienceWhy: 'Boiling hydrates yam amylopectin starches, breaking rigid cell walls into tender digestible starch gels.',
        visualCue: 'Yam edges round off slightly and water turns lightly cloudy.',
        soundCue: 'Vigorous bubbling.',
        aromaCue: 'Warm, sweet, comforting boiled yam steam.',
        stepIngredients: ['Water to cover', 'Salt (1/2 tsp)'],
        tip: 'The yam MUST be piping hot when pounding begins for seamless stretching.'
      },
      {
        stepNumber: 3,
        title: 'Pound & Knead into Stretchy Dough',
        instruction: 'Transfer hot yam into a wooden mortar (or stand mixer/food processor). Pound rhythmically with a pestle or dough blade, adding splashes of hot yam water until elastic, smooth, and stretchy.',
        durationSeconds: 420,
        formattedDuration: '7 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Mechanical shear aligns gelatinized starch chains into an elastic, pliable viscoelastic dough.',
        visualCue: 'Transforms from crumbly potato-like mash into a single glossy, elastic alabaster ball.',
        soundCue: 'Rhythmic thumping or motor hum.',
        aromaCue: 'Pure, sweet pounded yam aroma.',
        stepIngredients: ['Reserved hot cooking water (1/4 - 1/2 cup)'],
        tip: 'Add hot water in tiny tablespoons; too much water at once makes the swallow sticky instead of stretchy.'
      },
      {
        stepNumber: 4,
        title: 'Shape & Wrap for Service',
        instruction: 'Dip a serving paddle in hot water, roll the pounded yam into smooth oval morsels, and wrap in food-grade film or warm serving dishes. Serve piping hot with Egusi, Efo Riro, or Ogbono.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'rest',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Warm wrapping prevents surface moisture evaporation and maintains ideal swallow temperature.',
        visualCue: 'Silky smooth, glossy, pristine white mound.',
        soundCue: 'None.',
        aromaCue: 'Sweet warm steam.',
        stepIngredients: [],
        tip: 'Dip your spoon or fingers in warm soup first before molding morsels for eating.'
      }
    ]
  },
  {
    id: 'efo-riro',
    name: 'Efo Riro',
    category: 'Soups & Stews',
    calories: '410 kcal per serving',
    cooking_time: '40 minutes',
    servings: '4-6 servings',
    difficulty: 'Medium',
    origin: 'Yoruba / Nigerian',
    ingredients: 'Fresh spinach or shoko/tete greens, palm oil, locust beans (iru), smoked fish, assorted meat, prawns, scotch bonnet, bell pepper, onions, crayfish',
    directions: 'Blanch and squeeze excess water from greens. Coarsely blend peppers and onions. Fry locust beans in palm oil, add pepper mix and fry until concentrated. Add seasoned cooked meats, smoked fish, crayfish and stock. Fold in greens and simmer for 4 minutes.',
    tags: ['Rich in Iron', 'Keto Friendly', 'Traditional', 'Savory Stew'],
    referenceImages: ['/dataset/images/Efo riro.jpg', '/dataset/images/efo-riro.jpg', '/images/efo-riro.jpg'],
    imagePlaceholderColor: 'from-emerald-800 to-amber-900',
    steps: [
      {
        stepNumber: 1,
        title: 'Blanch & Squeeze Greens',
        instruction: 'Chop fresh spinach or tete leaves. Pour boiling water over them for 60 seconds, immediately plunge into cold water, then squeeze out every drop of excess moisture with your hands.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Squeezing removes excess vegetable water, preventing your rich palm oil stew from turning watery and diluted.',
        visualCue: 'Deep emerald green compacted vegetable balls.',
        soundCue: 'Water squeezing.',
        aromaCue: 'Fresh leafy green aroma.',
        stepIngredients: ['Fresh spinach, shoko or tete leaves (4 large bunches)'],
        tip: 'Squeeze firmly! The drier the greens, the richer your efo riro sauce will taste.'
      },
      {
        stepNumber: 2,
        title: 'Bloom Palm Oil & Fermented Locust Beans',
        instruction: 'Heat red palm oil in a wide pan. Add sliced red onions and washed fermented locust beans (iru). Fry for 2 minutes on medium heat until fragrant.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'fry',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Fat-soluble umami compounds in fermented locust beans infuse directly into the hot palm oil, providing deep foundational savory notes.',
        visualCue: 'Locust beans sizzling gently in bright red oil.',
        soundCue: 'Gentle sizzle.',
        aromaCue: 'Deep, earthy, pungent traditional umami aroma.',
        stepIngredients: ['Red palm oil (1/2 cup)', 'Washed fermented locust beans (iru, 2 tbsp)', 'Sliced red onion (1)']
      },
      {
        stepNumber: 3,
        title: 'Fry Coarse Pepper Base',
        instruction: 'Pour in coarsely pulsed red bell peppers and scotch bonnet mix. Fry on medium-high heat until the water evaporates and the pepper base is concentrated and thick.',
        durationSeconds: 600,
        formattedDuration: '10 mins',
        actionType: 'fry',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Coarse pulsing (instead of smooth blending) provides desirable texture and prevents emulsified water from trapping in the stew.',
        visualCue: 'Deep red sauce with visible pepper flecks and palm oil floating in glistening pools.',
        soundCue: 'Steady popping fry.',
        aromaCue: 'Roasted pepper and spicy aromatics.',
        stepIngredients: ['Coarsely pulsed bell peppers & scotch bonnets (2 cups)'],
        tip: 'Stir frequently so the bottom develops caramelization without burning.'
      },
      {
        stepNumber: 4,
        title: 'Infuse Meats, Smoked Fish & Crayfish',
        instruction: 'Add cooked assorted beef, tender tripe, deboned smoked catfish, dried prawns, and ground crayfish. Add a splash of stock and simmer for 8 minutes so flavors meld.',
        durationSeconds: 480,
        formattedDuration: '8 mins',
        actionType: 'simmer',
        flameLevel: 'Medium-Low',
        scienceWhy: 'Simmering proteins in the concentrated pepper sauce allows meat pores to absorb the spiced oil and smoky fish oils.',
        visualCue: 'Thick, jammy, glistening stew laden with meats and seafood.',
        soundCue: 'Gentle bubbling.',
        aromaCue: 'Intense smoked catfish, crayfish and savory stew aroma.',
        stepIngredients: ['Cooked assorted meat (400g)', 'Deboned smoked catfish (1 large)', 'Dried prawns (1/2 cup)', 'Ground crayfish (3 tbsp)']
      },
      {
        stepNumber: 5,
        title: 'Fold in Greens & Flash Simmer',
        instruction: 'Unfurl the squeezed greens and fold gently into the rich stew. Simmer for only 3-4 minutes on low heat, then remove from heat completely.',
        durationSeconds: 240,
        formattedDuration: '4 mins',
        actionType: 'boil',
        flameLevel: 'Low Heat',
        scienceWhy: 'Minimal cooking keeps the vegetable cellular structure crisp and preserves bright color and nutrients.',
        visualCue: 'Lush green leaves glistening with rich red palm oil reduction.',
        soundCue: 'Soft simmering.',
        aromaCue: 'Harmonious fusion of fresh greens, smoked seafood, and aromatic palm oil.',
        stepIngredients: ['Blanched squeezed greens'],
        tip: 'Serve immediately with steaming Pounded Yam or Amala.'
      }
    ]
  },
  {
    id: 'chin-chin',
    name: 'Chin Chin',
    category: 'Snacks & Pastries',
    calories: '220 kcal per handful',
    cooking_time: '45 minutes',
    servings: '8-10 servings',
    difficulty: 'Easy',
    origin: 'West African',
    ingredients: 'All-purpose flour, sugar, butter, eggs, evaporated milk, freshly grated nutmeg, baking powder, pinch of salt, vegetable oil for deep frying',
    directions: 'Whisk flour, sugar, nutmeg, baking powder and salt in a bowl. Rub cold butter into the flour until crumbly. Mix in egg and milk to form a stiff dough. Roll out to 5mm thickness and cut into miniature crunchy cubes. Deep fry in medium-hot oil until golden brown.',
    tags: ['Crispy Snack', 'Sweet & Nutty', 'Party Snack', 'Holiday Staple'],
    referenceImages: ['/dataset/images/Chin_Chin.webp', '/dataset/images/Chin Chin 1.jpeg', '/dataset/images/chin-chin.jpg', '/images/chin-chin.jpg'],
    imagePlaceholderColor: 'from-amber-600 to-yellow-700',
    steps: [
      {
        stepNumber: 1,
        title: 'Rub Butter into Spiced Flour',
        instruction: 'Combine flour, sugar, freshly grated nutmeg, baking powder, and salt. Rub cold cubed butter into the flour using your fingertips until the mixture resembles fine breadcrumbs.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Coating flour proteins in butter fat limits gluten formation, guaranteeing a delightfully crisp and crumbly crunch rather than hard rock-like dough.',
        visualCue: 'Pale sandy-colored crumbly flour mixture.',
        soundCue: 'Soft rustling of flour.',
        aromaCue: 'Sweet, buttery, fragrant nutmeg aroma.',
        stepIngredients: ['All-purpose flour (4 cups)', 'Sugar (1/2 cup)', 'Fresh nutmeg (1/2 tsp grated)', 'Baking powder (1/2 tsp)', 'Cold butter (100g)'],
        tip: 'Freshly grated whole nutmeg provides 10x more aroma than pre-packaged powder.'
      },
      {
        stepNumber: 2,
        title: 'Form Stiff Dough & Rest',
        instruction: 'Beat egg with evaporated milk and pour into flour. Knead briefly (1-2 minutes) into a firm, smooth dough. Wrap and let rest for 10 minutes.',
        durationSeconds: 600,
        formattedDuration: '10 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Resting allows flour starches to hydrate fully and relaxes gluten tension, making rolling effortless.',
        visualCue: 'Smooth, non-sticky dough ball holding its shape.',
        soundCue: 'Dough kneading on clean counter.',
        aromaCue: 'Sweet milky pastry scent.',
        stepIngredients: ['Large egg (1)', 'Evaporated milk (1/3 cup)'],
        tip: 'Keep the dough stiff! Soft, wet dough makes soggy chin chin.'
      },
      {
        stepNumber: 3,
        title: 'Roll & Cut into Miniature Cubes',
        instruction: 'Roll dough out on a lightly floured surface to 4-5mm thickness. Use a pizza cutter or sharp knife to slice into clean 1cm x 1cm miniature cubes.',
        durationSeconds: 480,
        formattedDuration: '8 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Consistent cube sizing ensures all pieces fry to identical golden crunch simultaneously.',
        visualCue: 'Hundreds of tiny neat diamond or square dough pillows.',
        soundCue: 'Pizza cutter slicing on board.',
        aromaCue: 'Buttery dough.',
        stepIngredients: ['Flour for dusting'],
        tip: 'Dust cut cubes lightly with flour so they don’t stick together before hitting the oil.'
      },
      {
        stepNumber: 4,
        title: 'Deep Fry to Radiant Golden Brown',
        instruction: 'Heat vegetable oil to 170°C (340°F) in a deep pot. Gently slide in batches of chin chin. Fry on medium heat, stirring continuously with a spider spoon for 6-8 minutes until golden amber.',
        durationSeconds: 480,
        formattedDuration: '8 mins',
        actionType: 'fry',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Continuous stirring promotes uniform heat transfer across all surfaces while water vaporizes out of the dough, locking in crisp crunch.',
        visualCue: 'Dough cubes float, expanding slightly and turning rich golden amber.',
        soundCue: 'Crisp, lively sizzling bubbling.',
        aromaCue: 'Irresistible sweet pastry bakery aroma.',
        stepIngredients: ['Vegetable oil (1 liter for deep frying)'],
        tip: 'Remove from oil when one shade lighter than your target; residual heat continues browning on the paper towel!'
      },
      {
        stepNumber: 5,
        title: 'Drain & Cool for Maximum Crunch',
        instruction: 'Transfer golden chin chin with a slotted spoon onto paper towel-lined trays. Spread in a single layer and allow to cool completely to room temperature.',
        durationSeconds: 600,
        formattedDuration: '10 mins',
        actionType: 'rest',
        flameLevel: 'Off / Prep',
        scienceWhy: 'As fats cool and starch retrogrades, the texture shifts from soft to shatteringly crisp.',
        visualCue: 'Dry, non-greasy, golden crunch pillows.',
        soundCue: 'Glass-like rattle when shaken in a bowl.',
        aromaCue: 'Sweet caramelized crust.',
        stepIngredients: [],
        tip: 'Store in an airtight jar once 100% cooled; stays crisp for over a month.'
      }
    ]
  },
  {
    id: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese',
    category: 'Pasta & Noodles',
    calories: '550 kcal per serving',
    cooking_time: '40 minutes',
    servings: '4 servings',
    difficulty: 'Easy',
    origin: 'Italian',
    ingredients: 'Spaghetti pasta, minced beef, crushed tomatoes, onion, garlic, tomato paste, olive oil, dried oregano, basil, black pepper, parmesan cheese, salt',
    directions: 'Saute onions and garlic in olive oil. Brown minced beef until cooked through. Add tomato paste, crushed tomatoes and Italian herbs. Simmer sauce on low heat. Cook spaghetti in salted boiling water until al dente. Combine pasta with sauce and top with parmesan.',
    tags: ['Classic Pasta', 'Family Friendly', 'Hearty', 'Comfort Food'],
    referenceImages: ['/dataset/images/Spaghetti Bolognese.jpg', '/dataset/images/spaghetti-bolognese.jpg', '/images/spaghetti-bolognese.jpg'],
    imagePlaceholderColor: 'from-red-700 to-amber-800',
    steps: [
      {
        stepNumber: 1,
        title: 'Saute Aromatics & Brown Minced Beef',
        instruction: 'Heat olive oil in a wide pan. Add finely chopped onions and minced garlic, cook for 2 minutes until translucent. Add minced beef, breaking up clumps with a wooden spoon until browned.',
        durationSeconds: 420,
        formattedDuration: '7 mins',
        actionType: 'fry',
        flameLevel: 'Medium-High',
        scienceWhy: 'Browning ground meat initiates Maillard reactions, producing savory pyrazines and rich umami depth.',
        visualCue: 'Beef turns deep brown with rendered juices and softened golden onions.',
        soundCue: 'Lively sizzling of meat in oil.',
        aromaCue: 'Garlic, sweet onion, and seared beef aroma.',
        stepIngredients: ['Olive oil (2 tbsp)', 'Minced beef (500g)', 'Yellow onion (1 diced)', 'Garlic (3 cloves minced)']
      },
      {
        stepNumber: 2,
        title: 'Simmer Rich Herb Bolognese Ragu',
        instruction: 'Stir in tomato paste, crushed plum tomatoes, oregano, basil, black pepper, and salt. Reduce heat to low, cover partially, and simmer gently for 20 minutes.',
        durationSeconds: 1200,
        formattedDuration: '20 mins',
        actionType: 'simmer',
        flameLevel: 'Low Heat',
        scienceWhy: 'Slow simmering breaks down tomato acids and allows glutamates from tomatoes and beef to synergize.',
        visualCue: 'Glossy, thick, dark crimson meat sauce with gentle bubbling.',
        soundCue: 'Slow rhythmic bubbling.',
        aromaCue: 'Sweet basil, earthy oregano, and rich tomato sauce.',
        stepIngredients: ['Tomato paste (2 tbsp)', 'Crushed canned tomatoes (400g)', 'Dried oregano (1 tsp)', 'Dried basil (1 tsp)', 'Salt & black pepper']
      },
      {
        stepNumber: 3,
        title: 'Boil Spaghetti to Al Dente',
        instruction: 'Bring a large pot of heavily salted water to a rolling boil. Drop in spaghetti, stirring occasionally. Cook for 8-9 minutes until firm to the bite (al dente). Reserve 1/2 cup pasta water before draining.',
        durationSeconds: 540,
        formattedDuration: '9 mins',
        actionType: 'boil',
        flameLevel: 'High Heat',
        scienceWhy: 'Cooking al dente preserves a lower glycemic index and leaves enough surface starch to emulsify with the sauce.',
        visualCue: 'Flexible, bouncy pasta strands with a tiny white core.',
        soundCue: 'Rolling water boil.',
        aromaCue: 'Warm wheat pasta steam.',
        stepIngredients: ['Spaghetti (400g)', 'Coarse salt (1 tbsp)']
      },
      {
        stepNumber: 4,
        title: 'Emulsify & Plate with Parmesan',
        instruction: 'Toss hot spaghetti directly into the Bolognese pan with a splash of reserved starchy pasta water. Toss vigorously over heat for 1 minute until sauce clings to every strand. Plate and top with grated parmesan.',
        durationSeconds: 120,
        formattedDuration: '2 mins',
        actionType: 'toss',
        flameLevel: 'Low Heat',
        scienceWhy: 'Starch in the pasta water emulsifies the beef fats and tomato juices into a cohesive, velvety glaze that clings to pasta.',
        visualCue: 'Glossy red-coated pasta ribbons with no pooling liquid at the bottom.',
        soundCue: 'Creamy tossing slurp sound.',
        aromaCue: 'Rich cheese and herbed tomato pasta.',
        stepIngredients: ['Reserved pasta water (1/4 cup)', 'Freshly grated Parmesan (1/2 cup)']
      }
    ]
  },
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken',
    category: 'Poultry & BBQ',
    calories: '320 kcal per serving',
    cooking_time: '35 minutes',
    servings: '4 servings',
    difficulty: 'Easy',
    origin: 'International',
    ingredients: 'Chicken quarters or breasts, garlic powder, onion powder, paprika, rosemary, olive oil, lemon juice, black pepper, salt',
    directions: 'Marinate chicken in olive oil, lemon juice, garlic, paprika and herbs for at least 20 minutes. Preheat grill or grill pan. Cook chicken on medium heat for 6-8 minutes per side until charred, cooked through, and internal temperature reaches 75°C (165°F).',
    tags: ['High Protein', 'Keto Friendly', 'BBQ', 'Quick Dinner'],
    referenceImages: ['/dataset/images/Grilled Chicken.jpg', '/dataset/images/grilled-chicken.jpg', '/images/grilled-chicken.jpg'],
    imagePlaceholderColor: 'from-amber-700 to-yellow-800',
    steps: [
      {
        stepNumber: 1,
        title: 'Score & Marinate Chicken with Herb Rub',
        instruction: 'Make shallow diagonal cuts into chicken pieces. Rub thoroughly with olive oil, fresh lemon juice, smoked paprika, garlic powder, onion powder, crushed rosemary, and salt. Let marinate 15 minutes.',
        durationSeconds: 900,
        formattedDuration: '15 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Lemon acid relaxes surface proteins while cuts allow seasonings to penetrate deep into the meat fibers.',
        visualCue: 'Golden-red herb-crusted chicken glistening with oil.',
        soundCue: 'None.',
        aromaCue: 'Fragrant rosemary, zesty lemon, and smoky paprika.',
        stepIngredients: ['Chicken thighs or breasts (800g)', 'Olive oil (3 tbsp)', 'Lemon juice (2 tbsp)', 'Smoked paprika (1 tbsp)', 'Garlic & onion powder (1 tsp each)', 'Crushed rosemary (1 tsp)']
      },
      {
        stepNumber: 2,
        title: 'Sear Skin-Side Down for Grill Marks',
        instruction: 'Preheat grill or cast-iron grill pan to medium-high. Place chicken skin-side down. Sear undisturbed for 7-8 minutes until crisp and prominent grill marks form.',
        durationSeconds: 480,
        formattedDuration: '8 mins',
        actionType: 'grill',
        flameLevel: 'Medium-High',
        scienceWhy: 'High dry heat renders subcutaneous poultry fat and crisps the collagen-rich skin.',
        visualCue: 'Dark golden-brown parallel sear marks on crispy chicken skin.',
        soundCue: 'Energetic continuous fat sizzle.',
        aromaCue: 'Roasting poultry skin and herb char.',
        stepIngredients: []
      },
      {
        stepNumber: 3,
        title: 'Flip & Cook Through to 75°C',
        instruction: 'Flip chicken pieces over. Lower heat to medium, cover with a lid or foil tent, and grill for 8-10 minutes until juices run clear and internal temp reaches 75°C (165°F).',
        durationSeconds: 540,
        formattedDuration: '9 mins',
        actionType: 'grill',
        flameLevel: 'Medium Heat',
        scienceWhy: 'Indirect covered heat finishes cooking internal muscle fibers without scorching the outer skin.',
        visualCue: 'Firm, plump chicken releasing clear savory juices.',
        soundCue: 'Quiet sizzle.',
        aromaCue: 'Juicy roasted chicken aroma.',
        stepIngredients: []
      },
      {
        stepNumber: 4,
        title: 'Rest & Garnish with Fresh Herbs',
        instruction: 'Transfer chicken to a warm platter. Tent loosely with foil and let rest for 5 minutes before carving to allow juices to settle. Garnish with lemon wedges.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'rest',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Resting allows contracted muscle fibers to relax and re-absorb moisture, preventing dry meat upon slicing.',
        visualCue: 'Glistening golden chicken platter garnished with green parsley and yellow lemon.',
        soundCue: 'None.',
        aromaCue: 'Warm citrus and roast chicken.',
        stepIngredients: ['Lemon wedges', 'Fresh chopped parsley']
      }
    ]
  },
  {
    id: 'vegetable-salad',
    name: 'Vegetable Salad',
    category: 'Salads & Healthy',
    calories: '180 kcal per serving',
    cooking_time: '15 minutes',
    servings: '4 servings',
    difficulty: 'Easy',
    origin: 'International',
    ingredients: 'Crisp lettuce, cucumbers, cherry tomatoes, sweetcorn, shredded carrots, boiled eggs, baked beans (optional for Nigerian style), olive oil or mayonnaise dressing',
    directions: 'Wash and dry all vegetables thoroughly. Chop lettuce, slice cucumbers and carrots. Boil and slice eggs. Layer crisp lettuce on a platter, arrange cucumbers, tomatoes, sweetcorn, and egg wedges. Drizzle with your favorite dressing and serve chilled.',
    tags: ['Fresh & Crisp', 'Low Calorie', 'Vitamins & Fiber', 'Side Dish'],
    referenceImages: ['/dataset/images/Vegetable Salad.jpg', '/dataset/images/vegetable-salad.jpg', '/images/vegetable-salad.jpg'],
    imagePlaceholderColor: 'from-emerald-600 to-green-700',
    steps: [
      {
        stepNumber: 1,
        title: 'Wash, Spin Dry & Chop Crisp Greens',
        instruction: 'Submerge lettuce in ice-cold water, spin completely dry in a salad spinner, and tear into bite-sized leaves.',
        durationSeconds: 240,
        formattedDuration: '4 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Ice water restores cellular turgor pressure in leaves for maximum crisp snap. Dry leaves allow dressing to adhere instead of sliding off.',
        visualCue: 'Vibrant, crunchy emerald lettuce leaves with zero moisture pooling.',
        soundCue: 'Crisp snap of fresh lettuce.',
        aromaCue: 'Fresh clean garden fragrance.',
        stepIngredients: ['Crisp romaine or iceberg lettuce (1 large head)']
      },
      {
        stepNumber: 2,
        title: 'Precision Slice Colorful Vegetables',
        instruction: 'Slice English cucumbers into half-moons, halve cherry tomatoes, and julienne crisp carrots into fine matchsticks.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'prep',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Different vegetable cuts provide dynamic textural contrast (crunchy carrots, juicy tomatoes, cool cucumbers).',
        visualCue: 'Rainbow array of scarlet tomatoes, orange carrots, and green cucumbers.',
        soundCue: 'Rhythmic knife chops.',
        aromaCue: 'Fresh cucumber and sweet tomato scent.',
        stepIngredients: ['Cucumber (1 medium)', 'Cherry tomatoes (1 cup)', 'Carrots (2 shredded)', 'Sweet corn (1/2 cup)']
      },
      {
        stepNumber: 3,
        title: 'Whisk Emulsified Dressing',
        instruction: 'In a small jar, vigorously shake extra-virgin olive oil, fresh lemon juice, Dijon mustard, honey, salt, and cracked black pepper until creamy and emulsified.',
        durationSeconds: 120,
        formattedDuration: '2 mins',
        actionType: 'blend',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Mustard acts as a natural surfactant (emulsifier) holding oil and lemon juice together in a silky emulsion.',
        visualCue: 'Uniform golden-yellow dressing that coats the back of a spoon.',
        soundCue: 'Jar shaking.',
        aromaCue: 'Zesty lemon, mustard punch, and fruity olive oil.',
        stepIngredients: ['Extra virgin olive oil (4 tbsp)', 'Lemon juice (2 tbsp)', 'Dijon mustard (1 tsp)', 'Honey (1 tsp)', 'Salt & pepper']
      },
      {
        stepNumber: 4,
        title: 'Compose, Toss & Garnish',
        instruction: 'Arrange vegetable layers on a wide platter. Top with hard-boiled egg wedges. Drizzle dressing lightly over the top just before serving.',
        durationSeconds: 180,
        formattedDuration: '3 mins',
        actionType: 'toss',
        flameLevel: 'Off / Prep',
        scienceWhy: 'Dressing immediately before eating prevents salt from drawing out water and wilting fragile greens.',
        visualCue: 'Artistic culinary platter with glistening rainbow produce and golden egg yolks.',
        soundCue: 'None.',
        aromaCue: 'Fresh garden vitality.',
        stepIngredients: ['Hard-boiled eggs (2 sliced into wedges)']
      }
    ]
  },
  {
    id: 'amala',
    name: 'Amala with Ewedu & Gbegiri',
    category: 'Swallows & Tubers',
    calories: '420 kcal per serving',
    cooking_time: '25 minutes',
    servings: '4 servings',
    difficulty: 'Easy',
    origin: 'West African / Yoruba',
    ingredients: 'Yam flour (elubo), hot boiling water, ewedu leaves, potash/kaun, ground crayfish, iru (locust beans), gbegiri bean soup, assorted meat and stew',
    directions: 'Bring water to a vigorous boil. Slowly whisk in yam flour (elubo) using an omorogun (wooden turning stick) to eliminate lumps. Stir and fold continuously until dark, stretchy, and velvety smooth. Cover and steam for 5 minutes with a splash of water, then fold again. Serve with jute leaf (ewedu) soup and savory stew.',
    tags: ['Traditional Swallow', 'High Fiber', 'Authentic Heritage', 'Comfort Food'],
    referenceImages: ['/dataset/images/Amala.jpg', '/dataset/images/amala.jpg', '/images/amala.jpg'],
    imagePlaceholderColor: 'from-stone-800 to-amber-950',
    steps: [
      {
        stepNumber: 1,
        title: 'Boil Water & Sift Yam Flour',
        instruction: 'Bring 4 cups of filtered water to a rolling boil in a heavy stainless steel pot or Dutch oven. Ensure the yam flour (elubo) is sifted and free of debris.',
        durationSeconds: 300,
        formattedDuration: '5 mins',
        actionType: 'boil',
        flameLevel: 'High Heat',
        scienceWhy: 'Boiling water rapidly hydrates yam starches simultaneously, triggering immediate gelatinization without forming raw flour cores.',
        visualCue: 'Vigorous rolling boil with thick steam vapors rising.',
        soundCue: 'Vigorous bubbling water.',
        aromaCue: 'Clean steam with subtle earthy undertones.',
        stepIngredients: ['Filtered water (4 cups)', 'Authentic yam flour / Elubo (2 cups)'],
        tip: 'Reserve 1/2 cup of hot water in a cup before adding flour to adjust texture later.'
      },
      {
        stepNumber: 2,
        title: 'Whisk & Fold to Silky Swallow',
        instruction: 'Reduce flame to medium-low. Slowly pour in the yam flour while turning rapidly in one direction with an omorogun (wooden paddle). Beat against the sides of the pot until velvety, lump-free, and dark brown.',
        durationSeconds: 360,
        formattedDuration: '6 mins',
        actionType: 'blend',
        flameLevel: 'Medium-Low',
        scienceWhy: 'Vigorous mechanical folding shears the hydrated yam starches into an elastic, coherent network.',
        visualCue: 'Transforms from dusty beige powder to a glossy, dark velvet brown dough.',
        soundCue: 'Rhythmic slapping of wooden paddle against pot.',
        aromaCue: 'Rich, distinct roasted yam flour aroma.',
        stepIngredients: ['Reserved hot water (as needed for elasticity)'],
        tip: 'Press any tiny lumps firmly against the inside walls of the pot with the back of the paddle.'
      },
      {
        stepNumber: 3,
        title: 'Gentle Steam Simmer',
        instruction: 'Pour 2-3 tablespoons of hot water around the perimeter of the dough ball, cover pot tightly with a lid, and let steam on lowest heat for 4-5 minutes.',
        durationSeconds: 240,
        formattedDuration: '4 mins',
        actionType: 'simmer',
        flameLevel: 'Low Heat',
        scienceWhy: 'Trapped steam ensures the core of the swallow is fully cooked and tender throughout.',
        visualCue: 'Faint steam escaping lid with dough becoming extra pliable and glossy.',
        soundCue: 'Quiet simmering hiss.',
        aromaCue: 'Warm, earthy comfort aroma.',
        stepIngredients: ['Hot water (3 tbsp)'],
        tip: 'Keep lid tightly closed to let steam work.'
      },
      {
        stepNumber: 4,
        title: 'Final Turn & Wrap',
        instruction: 'Uncover and turn the dough vigorously one last time until shiny, pliable, and perfectly uniform. Scoop into portions and serve hot alongside fresh Ewedu and spiced beef stew.',
        durationSeconds: 120,
        formattedDuration: '2 mins',
        actionType: 'rest',
        flameLevel: 'Off / Prep',
        scienceWhy: 'A final turn aligns starch polymers for maximum smoothness upon cooling slightly.',
        visualCue: 'Glistening, dark chocolate-brown smooth swallow mounds.',
        soundCue: 'Smooth spatula strokes.',
        aromaCue: 'Classic Buka aroma of hot amala and savory soup.',
        stepIngredients: ['Fresh Ewedu and Buka Stew (for serving)']
      }
    ]
  }
];

export const SAMPLE_PRESET_IMAGES = [
  {
    recipeId: 'jollof-rice',
    name: 'Jollof Rice',
    url: LOCAL_BUNDLED_DISH_IMAGES['jollof-rice'] || '/dataset/images/jollof-rice.jpg',
    category: 'Rice & Grains',
    hint: 'Rich tomato red and golden curry hues'
  },
  {
    recipeId: 'egusi-soup',
    name: 'Egusi Soup',
    url: LOCAL_BUNDLED_DISH_IMAGES['egusi-soup'] || '/dataset/images/egusi-soup.jpg',
    category: 'Soups & Stews',
    hint: 'Textured golden melon seed lumps & green vegetables'
  },
  {
    recipeId: 'suya',
    name: 'Suya',
    url: LOCAL_BUNDLED_DISH_IMAGES['suya'] || '/dataset/images/suya.jpg',
    category: 'Grilled & Street Food',
    hint: 'Deep savory grilled tones with ground peanut spice'
  },
  {
    recipeId: 'efo-riro',
    name: 'Efo Riro',
    url: LOCAL_BUNDLED_DISH_IMAGES['efo-riro'] || '/dataset/images/efo-riro.jpg',
    category: 'Soups & Stews',
    hint: 'Deep emerald greens with rich palm oil reduction'
  },
  {
    recipeId: 'moin-moin',
    name: 'Moin Moin',
    url: LOCAL_BUNDLED_DISH_IMAGES['moi-moi'] || '/dataset/images/moi-moi.jpg',
    category: 'Legumes & Steamed',
    hint: 'Steamed savory spiced golden-orange bean cake pudding'
  },
  {
    recipeId: 'chin-chin',
    name: 'Chin Chin',
    url: LOCAL_BUNDLED_DISH_IMAGES['chin-chin'] || '/dataset/images/chin-chin.jpg',
    category: 'Snacks & Pastries',
    hint: 'Crispy fried golden cube pastries'
  },
  {
    recipeId: 'pounded-yam',
    name: 'Pounded Yam',
    url: LOCAL_BUNDLED_DISH_IMAGES['pounded-yam'] || '/dataset/images/pounded-yam.jpg',
    category: 'Swallows & Tubers',
    hint: 'Bright alabaster smooth yam swallow'
  },
  {
    recipeId: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese',
    url: LOCAL_BUNDLED_DISH_IMAGES['spaghetti-bolognese'] || '/dataset/images/spaghetti-bolognese.jpg',
    category: 'Pasta & Noodles',
    hint: 'Twirled pasta in savory red Bolognese meat sauce'
  },
  {
    recipeId: 'grilled-chicken',
    name: 'Grilled Chicken',
    url: LOCAL_BUNDLED_DISH_IMAGES['grilled-chicken'] || '/dataset/images/grilled-chicken.jpg',
    category: 'Poultry & BBQ',
    hint: 'Flame-roasted chicken with herb crust'
  },
  {
    recipeId: 'vegetable-salad',
    name: 'Vegetable Salad',
    url: LOCAL_BUNDLED_DISH_IMAGES['vegetable-salad'] || '/dataset/images/vegetable-salad.jpg',
    category: 'Salads & Healthy',
    hint: 'Crisp green lettuce, sweetcorn, and fresh veggies'
  },
  {
    recipeId: 'amala',
    name: 'Amala',
    url: LOCAL_BUNDLED_DISH_IMAGES['amala'] || '/dataset/images/amala.jpg',
    category: 'Swallows & Tubers',
    hint: 'Dark velvet yam flour swallow with Ewedu'
  }
];

export interface DatasetEntry {
  filename: string;
  recipeName: string;
  recipeId: string;
  vector: number[];
}

export const DATASET_ENCODINGS: DatasetEntry[] = [
  {
    filename: 'chin_chin_001.jpg',
    recipeName: 'Chin Chin',
    recipeId: 'chin-chin',
    vector: [0.77884,0.61208,0.35414,0.78184,0.61521,0.35824,0.78204,0.61460,0.35641,0.77665,0.60940,0.35085,0.76063,0.59600,0.34440,0.77123,0.60462,0.34863,0.76632,0.60384,0.35008,0.77148,0.60431,0.34758,0.74230,0.58414,0.33400,0.74104,0.58021,0.32982,0.75133,0.58988,0.33703,0.73809,0.57946,0.32997,0.68656,0.53678,0.29851,0.69742,0.54848,0.30870,0.69974,0.55160,0.30932,0.69344,0.54714,0.30722,0,0,49.4688,14.5312,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,32.7812,31.2188]
  },
  {
    filename: 'chin_chin_002.jpg',
    recipeName: 'Chin Chin',
    recipeId: 'chin-chin',
    vector: [0.77785,0.61066,0.35249,0.78345,0.61633,0.35889,0.78361,0.61596,0.35777,0.77673,0.60934,0.35105,0.75924,0.59477,0.34293,0.77196,0.60538,0.34960,0.76644,0.60408,0.35041,0.77196,0.60492,0.34812,0.74148,0.58339,0.33319,0.74088,0.58000,0.32938,0.75109,0.58963,0.33671,0.73775,0.57917,0.32962,0.68595,0.53625,0.29806,0.69704,0.54817,0.30837,0.69947,0.55134,0.30906,0.69324,0.54699,0.30707,0,0,48.9688,15.0312,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,33.0938,30.9062]
  },
  {
    filename: 'efo_riro_001.jpg',
    recipeName: 'Efo Riro',
    recipeId: 'efo-riro',
    vector: [0.14728,0.45781,0.19069,0.16339,0.47271,0.20524,0.16075,0.47262,0.20409,0.18047,0.48899,0.22271,0.15502,0.45262,0.19597,0.15989,0.45425,0.19946,0.14588,0.43734,0.18471,0.15174,0.44026,0.18902,0.14447,0.41918,0.17904,0.14197,0.41743,0.17726,0.12371,0.40427,0.15904,0.11979,0.40134,0.15632,0.11928,0.37936,0.15444,0.12461,0.38728,0.16010,0.13658,0.41193,0.17258,0.12318,0.38920,0.15547,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,60.4219,3.5781,0]
  },
  {
    filename: 'efo_riro_002.jpg',
    recipeName: 'Efo Riro',
    recipeId: 'efo-riro',
    vector: [0.14724,0.45892,0.19069,0.16304,0.47272,0.20495,0.16055,0.47255,0.20394,0.18064,0.48911,0.22292,0.15478,0.45227,0.19560,0.15941,0.45411,0.19904,0.14582,0.43752,0.18474,0.15188,0.44053,0.18919,0.14436,0.41913,0.17894,0.14188,0.41751,0.17730,0.12367,0.40424,0.15899,0.11979,0.40141,0.15636,0.11916,0.37931,0.15434,0.12472,0.38752,0.16026,0.13670,0.41212,0.17273,0.12362,0.39027,0.15835,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,63.9531,0.04688,0,61.0469,2.9531,0]
  },
  {
    filename: 'egusi_soup_001.jpg',
    recipeName: 'Egusi Soup',
    recipeId: 'egusi-soup',
    vector: [0.56098,0.60692,0.24331,0.57704,0.62126,0.25501,0.57004,0.61461,0.24876,0.55790,0.60388,0.24147,0.55173,0.60506,0.25461,0.53114,0.58559,0.24085,0.52357,0.57923,0.23323,0.50964,0.56641,0.22312,0.46624,0.53407,0.21063,0.46569,0.53071,0.20685,0.48778,0.54882,0.21221,0.46601,0.53222,0.20594,0.40594,0.48621,0.18398,0.41590,0.49525,0.18905,0.46748,0.53672,0.21553,0.44988,0.52212,0.20486,0,0,0,0,58.8594,5.1406,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,8.5,55.5,0]
  },
  {
    filename: 'egusi_soup_002.jpg',
    recipeName: 'Egusi Soup',
    recipeId: 'egusi-soup',
    vector: [0.54550,0.58914,0.22371,0.55567,0.60126,0.23756,0.55807,0.60388,0.24061,0.55173,0.59775,0.23384,0.49631,0.54772,0.19331,0.52437,0.57672,0.22391,0.51207,0.56800,0.22442,0.50766,0.56461,0.22333,0.47238,0.53090,0.19404,0.45968,0.52693,0.20326,0.48162,0.54438,0.21863,0.47073,0.53670,0.21249,0.52610,0.58464,0.24966,0.45682,0.53001,0.21635,0.42587,0.50317,0.19536,0.47570,0.54585,0.22719,0,0,0,0,61.2031,2.7969,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,4.75,59.25,0]
  },
  {
    filename: 'grilled_chicken_001.jpg',
    recipeName: 'Grilled Chicken',
    recipeId: 'grilled-chicken',
    vector: [0.83599,0.65452,0.34796,0.83974,0.65570,0.34968,0.83808,0.65115,0.34321,0.83958,0.66106,0.35499,0.81622,0.65317,0.35181,0.80463,0.64205,0.34248,0.78764,0.62903,0.33179,0.76385,0.61826,0.32623,0.71011,0.59081,0.31078,0.74283,0.60840,0.32160,0.68526,0.57560,0.30021,0.68556,0.57543,0.30078,0.61000,0.53185,0.27088,0.61147,0.53271,0.27212,0.63275,0.53802,0.27070,0.65326,0.55403,0.28316,0,0,54.9688,9.0312,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,31.7188,32.2812]
  },
  {
    filename: 'grilled_chicken_002.jpg',
    recipeName: 'Grilled Chicken',
    recipeId: 'grilled-chicken',
    vector: [0.86411,0.68179,0.37529,0.88776,0.69956,0.39053,0.84842,0.66584,0.35806,0.84219,0.65781,0.34985,0.79888,0.64239,0.34505,0.82704,0.65832,0.35683,0.79271,0.63945,0.34393,0.80230,0.64136,0.34433,0.71635,0.58569,0.30113,0.72817,0.58767,0.29899,0.74076,0.61327,0.33140,0.68480,0.57477,0.30044,0.60971,0.53199,0.27062,0.60982,0.53182,0.27051,0.61370,0.53552,0.27313,0.60973,0.53148,0.27114,0,0,51.9844,12.0156,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,30.2656,33.7344]
  },
  {
    filename: 'jollof_rice_001.jpg',
    recipeName: 'Jollof Rice',
    recipeId: 'jollof-rice',
    vector: [0.79224,0.27995,0.14738,0.76543,0.26196,0.13001,0.76578,0.26118,0.12938,0.76334,0.25708,0.12520,0.73762,0.25372,0.12266,0.69554,0.24484,0.11725,0.70870,0.23382,0.10351,0.70282,0.22315,0.09280,0.67964,0.25123,0.12777,0.63749,0.23131,0.10982,0.68183,0.23350,0.10515,0.66402,0.21993,0.09320,0.63893,0.23732,0.11723,0.56382,0.21305,0.09899,0.60549,0.22351,0.10444,0.63986,0.23061,0.10697,62.40625,1.59375,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,51.6875,12.3125,0]
  },
  {
    filename: 'jollof_rice_002.jpg',
    recipeName: 'Jollof Rice',
    recipeId: 'jollof-rice',
    vector: [0.76656,0.26108,0.12976,0.76990,0.26408,0.13297,0.76762,0.26322,0.13150,0.76583,0.26153,0.12979,0.71720,0.25337,0.12489,0.78675,0.29245,0.16178,0.74283,0.26229,0.13249,0.69859,0.22512,0.09570,0.65532,0.23816,0.11680,0.72027,0.26509,0.13808,0.64452,0.22350,0.09965,0.65426,0.21092,0.08442,0.56995,0.21684,0.10434,0.66719,0.25913,0.13721,0.57445,0.21682,0.10270,0.56596,0.20682,0.09214,62.0469,1.9531,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,44.0312,19.9688,0]
  },
  {
    filename: 'moin_moin_001.jpg',
    recipeName: 'Moin Moin',
    recipeId: 'moin-moin',
    vector: [0.47318,0.17197,0.13304,0.46435,0.16711,0.12760,0.46438,0.16684,0.12786,0.46916,0.16792,0.12886,0.43078,0.16131,0.12246,0.42217,0.15118,0.11340,0.41187,0.12872,0.08992,0.42296,0.13975,0.10136,0.37869,0.14548,0.10547,0.38448,0.14237,0.10363,0.38556,0.12953,0.09148,0.37811,0.13987,0.10095,0.33569,0.13324,0.10014,0.33598,0.13335,0.10032,0.34378,0.13246,0.09786,0.34783,0.13234,0.09539,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,52.4531,11.5469,0,64,0,0]
  },
  {
    filename: 'moin_moin_002.jpg',
    recipeName: 'Moin Moin',
    recipeId: 'moin-moin',
    vector: [0.46478,0.16716,0.12834,0.46442,0.16472,0.12615,0.46454,0.16491,0.12604,0.46393,0.16740,0.12750,0.42849,0.15816,0.12077,0.42529,0.15722,0.11829,0.42365,0.15607,0.11740,0.43030,0.15608,0.11722,0.38258,0.14674,0.10654,0.38382,0.14769,0.10792,0.40285,0.15873,0.11944,0.38960,0.14698,0.10705,0.33560,0.13333,0.09956,0.34812,0.12099,0.08404,0.36664,0.14266,0.10648,0.37707,0.14082,0.10233,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,59.7344,4.2656,0,64,0,0]
  },
  {
    filename: 'pounded_yam_001.jpg',
    recipeName: 'Pounded Yam',
    recipeId: 'pounded-yam',
    vector: [0.91040,0.90235,0.83942,0.91331,0.90714,0.84544,0.91374,0.90810,0.84617,0.92613,0.91906,0.85676,0.83419,0.84829,0.77997,0.83686,0.85264,0.78346,0.85640,0.86817,0.80297,0.90738,0.91267,0.85452,0.75930,0.79731,0.72212,0.80189,0.82940,0.75725,0.82932,0.84795,0.77948,0.80883,0.83684,0.76903,0.71462,0.76642,0.68658,0.78479,0.81799,0.74617,0.73216,0.78373,0.70653,0.66475,0.73375,0.64911,0,0,0.65625,15.2969,19.4688,13.4219,8.8281,6.0469,0.28125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,6.9844,57.0156]
  },
  {
    filename: 'pounded_yam_002.jpg',
    recipeName: 'Pounded Yam',
    recipeId: 'pounded-yam',
    vector: [0.90902,0.89763,0.83658,0.91913,0.90738,0.84662,0.91367,0.90916,0.84655,0.91203,0.90515,0.84299,0.83400,0.84717,0.77849,0.84118,0.85382,0.78646,0.83163,0.84853,0.77966,0.83163,0.84902,0.77957,0.74812,0.79047,0.71365,0.74871,0.79116,0.71402,0.75323,0.79312,0.71726,0.74792,0.79049,0.71348,0.67658,0.74256,0.65846,0.76408,0.80173,0.72664,0.74778,0.78810,0.71181,0.66170,0.73223,0.64648,0,0,1.625,13.9375,11.625,15.9531,14.5625,6.1406,0.15625,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,6.3594,57.6406]
  },
  {
    filename: 'spaghetti_bolognese_001.jpg',
    recipeName: 'Spaghetti Bolognese',
    recipeId: 'spaghetti-bolognese',
    vector: [0.65314,0.16687,0.14505,0.65588,0.16708,0.14481,0.65636,0.16391,0.14113,0.70535,0.20976,0.18667,0.59222,0.15532,0.13796,0.59772,0.15578,0.13722,0.60337,0.15548,0.13502,0.64522,0.18376,0.16448,0.58526,0.16523,0.14550,0.56800,0.15833,0.13836,0.53306,0.14491,0.12402,0.55308,0.14473,0.12405,0.47165,0.13419,0.11040,0.51003,0.14449,0.12347,0.52972,0.15047,0.12964,0.51714,0.12938,0.10983,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13.9844,50.0156,0,8.28125,55.7188,0]
  },
  {
    filename: 'spaghetti_bolognese_002.jpg',
    recipeName: 'Spaghetti Bolognese',
    recipeId: 'spaghetti-bolognese',
    vector: [0.65300,0.16725,0.14493,0.65193,0.16491,0.14528,0.64419,0.15688,0.13580,0.65283,0.16707,0.14660,0.59229,0.15585,0.13807,0.61736,0.15993,0.14177,0.62987,0.17181,0.15308,0.60133,0.15457,0.13617,0.55273,0.13906,0.11953,0.54173,0.14344,0.12310,0.54349,0.15100,0.12990,0.55623,0.14453,0.12511,0.48814,0.13690,0.11507,0.50225,0.13179,0.11091,0.47261,0.13284,0.11129,0.47214,0.13393,0.11077,63.9844,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.01562,0,0,3.9531,60.0469,0,13.0,51.0,0]
  },
  {
    filename: 'suya_001.jpg',
    recipeName: 'Suya',
    recipeId: 'suya',
    vector: [0.35253,0.21705,0.13894,0.35758,0.22089,0.14243,0.36864,0.23074,0.15156,0.35521,0.21932,0.14085,0.32638,0.19626,0.11936,0.32505,0.20323,0.12618,0.33110,0.20827,0.13182,0.32068,0.20216,0.12776,0.29985,0.19300,0.12316,0.30047,0.19516,0.12512,0.29666,0.19130,0.12414,0.28900,0.18664,0.11987,0.25937,0.17835,0.11252,0.31294,0.21296,0.14377,0.29357,0.20077,0.13300,0.25349,0.17394,0.10864,0,63.7188,0.28125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.15625,63.8438,0,4.0625,59.9375,0,0]
  },
  {
    filename: 'suya_002.jpg',
    recipeName: 'Suya',
    recipeId: 'suya',
    vector: [0.35199,0.21723,0.13863,0.36161,0.22506,0.14629,0.37431,0.23560,0.15722,0.33945,0.20020,0.12189,0.32005,0.20181,0.12544,0.32223,0.20103,0.12361,0.33972,0.21584,0.13911,0.31042,0.18655,0.10974,0.28850,0.18716,0.11968,0.28874,0.18552,0.11710,0.33356,0.21662,0.14059,0.29527,0.18692,0.11661,0.31945,0.21484,0.14611,0.26161,0.17886,0.11206,0.27210,0.17760,0.10977,0.29415,0.19989,0.13222,0,63.7031,0.29688,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.14062,63.8594,0,2.2031,61.7969,0,0]
  },
  {
    filename: 'vegetable_salad_001.jpg',
    recipeName: 'Vegetable Salad',
    recipeId: 'vegetable-salad',
    vector: [0.36572,0.63692,0.29098,0.36765,0.63853,0.29398,0.35216,0.62370,0.27975,0.35211,0.62335,0.27932,0.31995,0.58372,0.25967,0.31952,0.58300,0.25882,0.33370,0.59899,0.27194,0.32139,0.58511,0.26049,0.28744,0.54245,0.23520,0.28814,0.54571,0.23260,0.31808,0.58010,0.25928,0.29308,0.54959,0.23908,0.25495,0.50296,0.21186,0.25888,0.51435,0.20650,0.26809,0.52687,0.21435,0.27073,0.52673,0.21935,0,0,0,0,0,0,1.46875,62.53125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.01562,63.9844,0,0,2.3281,61.6719,0]
  },
  {
    filename: 'vegetable_salad_002.jpg',
    recipeName: 'Vegetable Salad',
    recipeId: 'vegetable-salad',
    vector: [0.37811,0.64994,0.30273,0.36278,0.63405,0.28911,0.35872,0.63147,0.28267,0.36537,0.63736,0.29119,0.31892,0.58278,0.25988,0.31742,0.58150,0.25597,0.31330,0.58015,0.24596,0.32526,0.58931,0.26213,0.28857,0.54184,0.23505,0.28759,0.54199,0.23500,0.29000,0.54666,0.23594,0.29285,0.54755,0.23894,0.28675,0.54305,0.23228,0.27575,0.52652,0.22727,0.28531,0.53635,0.23696,0.27705,0.52803,0.22918,0,0,0,0,0,0,1.5625,62.4375,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,3.4219,60.5781,0]
  },
  {
    filename: 'amala_001.jpg',
    recipeName: 'Amala',
    recipeId: 'amala',
    vector: [0.24512,0.18432,0.13210,0.25120,0.19014,0.13654,0.24876,0.18765,0.13420,0.25640,0.19450,0.13890,0.23890,0.17980,0.12870,0.24120,0.18120,0.12990,0.23540,0.17650,0.12640,0.23980,0.18020,0.12910,0.22450,0.16890,0.12100,0.22670,0.17040,0.12210,0.23010,0.17320,0.12450,0.22100,0.16580,0.11920,0.20890,0.15670,0.11240,0.21120,0.15890,0.11380,0.21560,0.16210,0.11620,0.21890,0.16450,0.11790,0,45.2,18.8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,24.5,39.5]
  }
];
