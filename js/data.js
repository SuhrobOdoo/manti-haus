/* ========================================
   MANTI HAUS — Menu Data & Configuration
   Structured for easy editing and future API integration
   ======================================== */

const SITE_CONFIG = {
  name: 'MANTI HAUS',
  tagline: {
    de: 'Handgemacht. Zentralasiatisch. Neu gedacht.',
    en: 'Handmade. Central Asian. Reimagined.',
    ru: 'Ручная работа. Центральная Азия. В новом формате.'
  },
  description: {
    de: 'Handgemachte Manti und zentralasiatische Küche in Deutschland.',
    en: 'Handmade Manti and Central Asian cuisine in Germany.',
    ru: 'Манты ручной лепки и центральноазиатская кухня в Германии.'
  },
  phone: '+49 30 12345678',
  email: 'info@mantihaus.de',
  address: {
    street: 'Musterstraße 42',
    zip: '10115',
    city: 'Berlin'
  },
  social: {
    instagram: 'https://instagram.com/manti.haus',
    tiktok: 'https://tiktok.com/@mantihaus',
    handle: '@manti.haus'
  }
};

const MENU_CATEGORIES = [
  { id: 'all', name: { de: 'Alle', en: 'All', ru: 'Все' }, icon: '🍽️' },
  { id: 'manti', name: { de: 'Manti', en: 'Manti', ru: 'Манты' }, icon: '🥟' },
  { id: 'vegetarisch', name: { de: 'Vegetarisch', en: 'Vegetarian', ru: 'Вегетарианское' }, icon: '🌿' },
  { id: 'beilagen', name: { de: 'Beilagen', en: 'Sides', ru: 'Гарниры' }, icon: '🥗' },
  { id: 'saucen', name: { de: 'Saucen', en: 'Sauces', ru: 'Соусы' }, icon: '🫙' },
  { id: 'getraenke', name: { de: 'Getränke', en: 'Drinks', ru: 'Напитки' }, icon: '🥤' },
  { id: 'desserts', name: { de: 'Desserts', en: 'Desserts', ru: 'Десерты' }, icon: '🍰' }
];

const MENU_PRODUCTS = [
  // ─── MANTI ───
  {
    id: 'classic-manti',
    name: { de: 'Classic Manti', en: 'Classic Manti', ru: 'Классические Манты' },
    category: 'manti',
    description: {
      de: 'Handgemachte Teigtaschen mit Rindfleisch, Zwiebeln und ausgewählten Gewürzen.',
      en: 'Handmade dumplings with beef, onions, and select spices.',
      ru: 'Слепленные вручную манты с говядиной, луком и отборными специями.'
    },
    ingredients: {
      de: 'Weizenmehl, Rindfleisch, Zwiebeln, Kreuzkümmel, Salz, Pfeffer',
      en: 'Wheat flour, beef, onions, cumin, salt, pepper',
      ru: 'Пшеничная мука, говядина, лук, зира, соль, перец'
    },
    allergens: { de: ['Gluten'], en: ['Gluten'], ru: ['Глютен'] },
    price: 9.90,
    image: 'images/menu_classic.jpg',
    vegetarian: false,
    featured: true,
    tag: { de: 'Beliebt', en: 'Popular', ru: 'Популярно' }
  },
  {
    id: 'chicken-manti',
    name: { de: 'Chicken Manti', en: 'Chicken Manti', ru: 'Куриные Манты' },
    category: 'manti',
    description: {
      de: 'Zarte Manti mit Hähnchenfleisch, frischen Kräutern und einer leichten Würzmischung.',
      en: 'Tender Manti with chicken, fresh herbs, and a light spice blend.',
      ru: 'Нежные манты с курицей, свежей зеленью и легкими специями.'
    },
    ingredients: {
      de: 'Weizenmehl, Hähnchenbrust, Zwiebeln, Dill, Minze, Salz, Pfeffer',
      en: 'Wheat flour, chicken breast, onions, dill, mint, salt, pepper',
      ru: 'Пшеничная мука, куриная грудка, лук, укроп, мята, соль, перец'
    },
    allergens: { de: ['Gluten'], en: ['Gluten'], ru: ['Глютен'] },
    price: 9.90,
    image: 'images/menu_chicken.jpg',
    vegetarian: false,
    featured: true,
    tag: null
  },
  {
    id: 'signature-manti',
    name: { de: 'Signature Manti', en: 'Signature Manti', ru: 'Фирменные Манты' },
    category: 'manti',
    description: {
      de: 'Unsere besondere Hauskreation — goldbraun angebraten mit Haus-Sauce und Granatapfelkernen.',
      en: 'Our special house creation — pan-fried golden brown with house sauce and pomegranate seeds.',
      ru: 'Наше фирменное творение — обжаренные до золотистой корочки с фирменным соусом и зернами граната.'
    },
    ingredients: {
      de: 'Weizenmehl, Rindfleisch, Lammfleisch, Zwiebeln, Gewürze, Granatapfel',
      en: 'Wheat flour, beef, lamb, onions, spices, pomegranate',
      ru: 'Пшеничная мука, говядина, баранина, лук, специи, гранат'
    },
    allergens: { de: ['Gluten'], en: ['Gluten'], ru: ['Глютен'] },
    price: 13.90,
    image: 'images/menu_signature.jpg',
    vegetarian: false,
    featured: true,
    tag: { de: 'Signature', en: 'Signature', ru: 'Фирменное' }
  },
  {
    id: 'spicy-manti',
    name: { de: 'Spicy Manti', en: 'Spicy Manti', ru: 'Острые Манты' },
    category: 'manti',
    description: {
      de: 'Feurige Manti mit scharfer Paprikapaste, Chili und einer kräftigen Tomaten-Sauce.',
      en: 'Fiery Manti with spicy pepper paste, chili, and a rich tomato sauce.',
      ru: 'Огненные манты с острой перечной пастой, чили и насыщенным томатным соусом.'
    },
    ingredients: {
      de: 'Weizenmehl, Rindfleisch, Zwiebeln, Paprikapaste, Chili, Tomaten',
      en: 'Wheat flour, beef, onions, pepper paste, chili, tomatoes',
      ru: 'Пшеничная мука, говядина, лук, перечная паста, чили, помидоры'
    },
    allergens: { de: ['Gluten'], en: ['Gluten'], ru: ['Глютен'] },
    price: 10.90,
    image: 'images/menu_classic.jpg',
    vegetarian: false,
    featured: false,
    tag: { de: 'Scharf 🌶️', en: 'Spicy 🌶️', ru: 'Остро 🌶️' }
  },

  // ─── VEGETARISCH ───
  {
    id: 'veggie-manti',
    name: { de: 'Veggie Manti', en: 'Veggie Manti', ru: 'Овощные Манты' },
    category: 'vegetarisch',
    description: {
      de: 'Bunte Manti mit saisonalem Gemüse und aromatischen Kräutern.',
      en: 'Colorful Manti with seasonal vegetables and aromatic herbs.',
      ru: 'Разноцветные манты с сезонными овощами и ароматными травами.'
    },
    ingredients: {
      de: 'Weizenmehl, Karotten, Zucchini, Paprika, Kräuter, Gewürze',
      en: 'Wheat flour, carrots, zucchini, bell peppers, herbs, spices',
      ru: 'Пшеничная мука, морковь, кабачки, болгарский перец, травы, специи'
    },
    allergens: { de: ['Gluten'], en: ['Gluten'], ru: ['Глютен'] },
    price: 8.90,
    image: 'images/menu_veggie.jpg',
    vegetarian: true,
    featured: true,
    tag: { de: 'Vegetarisch', en: 'Vegetarian', ru: 'Вегетарианское' }
  },
  {
    id: 'potato-manti',
    name: { de: 'Potato Manti', en: 'Potato Manti', ru: 'Манты с Картофелем' },
    category: 'vegetarisch',
    description: {
      de: 'Klassische Manti gefüllt mit gewürzten Kartoffeln und karamellisierten Zwiebeln.',
      en: 'Classic Manti filled with spiced potatoes and caramelized onions.',
      ru: 'Классические манты с начинкой из пряного картофеля и карамелизованного лука.'
    },
    ingredients: {
      de: 'Weizenmehl, Kartoffeln, Zwiebeln, Butter, Kreuzkümmel, Salz',
      en: 'Wheat flour, potatoes, onions, butter, cumin, salt',
      ru: 'Пшеничная мука, картофель, лук, сливочное масло, зира, соль'
    },
    allergens: { de: ['Gluten', 'Milch'], en: ['Gluten', 'Dairy'], ru: ['Глютен', 'Молоко'] },
    price: 8.90,
    image: 'images/menu_veggie.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Vegetarisch', en: 'Vegetarian', ru: 'Вегетарианское' }
  },
  {
    id: 'vegetable-manti',
    name: { de: 'Kürbis Manti', en: 'Pumpkin Manti', ru: 'Тыквенные Манты' },
    category: 'vegetarisch',
    description: {
      de: 'Herbstliche Manti mit geröstetem Kürbis, Salbei und einem Hauch Muskatnuss.',
      en: 'Autumn Manti with roasted pumpkin, sage, and a hint of nutmeg.',
      ru: 'Осенние манты с запеченной тыквой, шалфеем и щепоткой мускатного ореха.'
    },
    ingredients: {
      de: 'Weizenmehl, Kürbis, Salbei, Muskatnuss, Zwiebeln, Olivenöl',
      en: 'Wheat flour, pumpkin, sage, nutmeg, onions, olive oil',
      ru: 'Пшеничная мука, тыква, шалфей, мускатный орех, лук, оливковое масло'
    },
    allergens: { de: ['Gluten'], en: ['Gluten'], ru: ['Глютен'] },
    price: 9.90,
    image: 'images/menu_veggie.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Saisonal', en: 'Seasonal', ru: 'Сезонное' }
  },

  // ─── BEILAGEN ───
  {
    id: 'fresh-salad',
    name: { de: 'Frischer Salat', en: 'Fresh Salad', ru: 'Свежий Салат' },
    category: 'beilagen',
    description: {
      de: 'Knackiger Salat mit Tomaten, Gurken, roten Zwiebeln und einem leichten Zitronen-Dressing.',
      en: 'Crisp salad with tomatoes, cucumbers, red onions, and a light lemon dressing.',
      ru: 'Хрустящий салат с помидорами, огурцами, красным луком и легкой лимонной заправкой.'
    },
    ingredients: {
      de: 'Tomaten, Gurken, Zwiebeln, Zitrone, Olivenöl, Salz',
      en: 'Tomatoes, cucumbers, onions, lemon, olive oil, salt',
      ru: 'Помидоры, огурцы, лук, лимон, оливковое масло, соль'
    },
    allergens: { de: [], en: [], ru: [] },
    price: 4.90,
    image: 'images/gallery_6.jpg',
    vegetarian: true,
    featured: false,
    tag: null
  },
  {
    id: 'achichuk',
    name: { de: 'Achichuk', en: 'Achichuk', ru: 'Ачичук' },
    category: 'beilagen',
    description: {
      de: 'Traditioneller zentralasiatischer Tomaten-Zwiebel-Salat mit frischen Kräutern.',
      en: 'Traditional Central Asian tomato-onion salad with fresh herbs.',
      ru: 'Традиционный центральноазиатский салат из помидоров и лука со свежей зеленью.'
    },
    ingredients: {
      de: 'Tomaten, Zwiebeln, Koriander, Salz, Pfeffer',
      en: 'Tomatoes, onions, cilantro, salt, pepper',
      ru: 'Помидоры, лук, кинза, соль, перец'
    },
    allergens: { de: [], en: [], ru: [] },
    price: 4.50,
    image: 'images/gallery_6.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Traditionell', en: 'Traditional', ru: 'Традиционное' }
  },
  {
    id: 'bread',
    name: { de: 'Hausgemachtes Brot', en: 'Homemade Bread', ru: 'Домашний Хлеб' },
    category: 'beilagen',
    description: {
      de: 'Frisch gebackenes Fladenbrot nach zentralasiatischer Art.',
      en: 'Freshly baked Central Asian-style flatbread.',
      ru: 'Свежеиспеченная лепешка в центральноазиатском стиле.'
    },
    ingredients: {
      de: 'Weizenmehl, Wasser, Hefe, Salz, Sesam',
      en: 'Wheat flour, water, yeast, salt, sesame',
      ru: 'Пшеничная мука, вода, дрожжи, соль, кунжут'
    },
    allergens: { de: ['Gluten', 'Sesam'], en: ['Gluten', 'Sesame'], ru: ['Глютен', 'Кунжут'] },
    price: 2.90,
    image: 'images/gallery_2.jpg',
    vegetarian: true,
    featured: false,
    tag: null
  },
  {
    id: 'pickled-vegetables',
    name: { de: 'Eingelegtes Gemüse', en: 'Pickled Vegetables', ru: 'Соленые Овощи' },
    category: 'beilagen',
    description: {
      de: 'Hausgemachte eingelegte Gemüsemischung — knackig und säuerlich.',
      en: 'Homemade pickled vegetable mix — crisp and tangy.',
      ru: 'Домашнее овощное ассорти — хрустящее и пикантное.'
    },
    ingredients: {
      de: 'Gurken, Karotten, Paprika, Essig, Zucker, Gewürze',
      en: 'Cucumbers, carrots, bell peppers, vinegar, sugar, spices',
      ru: 'Огурцы, морковь, болгарский перец, уксус, сахар, специи'
    },
    allergens: { de: [], en: [], ru: [] },
    price: 3.90,
    image: 'images/gallery_6.jpg',
    vegetarian: true,
    featured: false,
    tag: null
  },

  // ─── SAUCEN ───
  {
    id: 'garlic-yogurt',
    name: { de: 'Knoblauch-Joghurt', en: 'Garlic Yogurt', ru: 'Чесночный Йогурт' },
    category: 'saucen',
    description: {
      de: 'Cremige Joghurt-Sauce mit frischem Knoblauch und Minze.',
      en: 'Creamy yogurt sauce with fresh garlic and mint.',
      ru: 'Кремовый йогуртовый соус со свежим чесноком и мятой.'
    },
    ingredients: {
      de: 'Joghurt, Knoblauch, Minze, Salz',
      en: 'Yogurt, garlic, mint, salt',
      ru: 'Йогурт, чеснок, мята, соль'
    },
    allergens: { de: ['Milch'], en: ['Dairy'], ru: ['Молоко'] },
    price: 1.90,
    image: 'images/gallery_4.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Empfohlen', en: 'Recommended', ru: 'Рекомендуем' }
  },
  {
    id: 'spicy-sauce',
    name: { de: 'Scharfe Sauce', en: 'Spicy Sauce', ru: 'Острый Соус' },
    category: 'saucen',
    description: {
      de: 'Feurige Chili-Sauce mit Paprika und Tomaten.',
      en: 'Fiery chili sauce with bell peppers and tomatoes.',
      ru: 'Огненный соус чили с болгарским перцем и помидорами.'
    },
    ingredients: {
      de: 'Chili, Paprika, Tomaten, Knoblauch, Öl',
      en: 'Chili, bell peppers, tomatoes, garlic, oil',
      ru: 'Чили, болгарский перец, помидоры, чеснок, масло'
    },
    allergens: { de: [], en: [], ru: [] },
    price: 1.90,
    image: 'images/gallery_4.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Scharf 🌶️', en: 'Spicy 🌶️', ru: 'Остро 🌶️' }
  },
  {
    id: 'signature-sauce',
    name: { de: 'Signature Sauce', en: 'Signature Sauce', ru: 'Фирменный Соус' },
    category: 'saucen',
    description: {
      de: 'Unsere geheime Haus-Sauce — das gewisse Etwas zu jedem Gericht.',
      en: 'Our secret house sauce — that special something for every dish.',
      ru: 'Наш секретный фирменный соус — изюминка для любого блюда.'
    },
    ingredients: {
      de: 'Geheimrezept',
      en: 'Secret recipe',
      ru: 'Секретный рецепт'
    },
    allergens: { de: ['Milch'], en: ['Dairy'], ru: ['Молоко'] },
    price: 2.50,
    image: 'images/gallery_4.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Haus-Favorit', en: 'House Favorite', ru: 'Любимец Гостей' }
  },

  // ─── GETRÄNKE ───
  {
    id: 'water',
    name: { de: 'Stilles / Sprudelwasser', en: 'Still / Sparkling Water', ru: 'Вода без/с газом' },
    category: 'getraenke',
    description: { de: 'Natürliches Mineralwasser, 0,5l.', en: 'Natural mineral water, 0.5l.', ru: 'Минеральная вода, 0,5 л.' },
    ingredients: { de: 'Wasser', en: 'Water', ru: 'Вода' },
    allergens: { de: [], en: [], ru: [] },
    price: 2.50,
    image: null,
    vegetarian: true,
    featured: false,
    tag: null
  },
  {
    id: 'coca-cola',
    name: { de: 'Coca-Cola', en: 'Coca-Cola', ru: 'Кока-Кола' },
    category: 'getraenke',
    description: { de: 'Das Original, 0,33l.', en: 'The Original, 0.33l.', ru: 'Оригинальная, 0,33 л.' },
    ingredients: { de: '', en: '', ru: '' },
    allergens: { de: [], en: [], ru: [] },
    price: 2.90,
    image: null,
    vegetarian: true,
    featured: false,
    tag: null
  },
  {
    id: 'fanta',
    name: { de: 'Fanta', en: 'Fanta', ru: 'Фанта' },
    category: 'getraenke',
    description: { de: 'Erfrischend fruchtig, 0,33l.', en: 'Refreshingly fruity, 0.33l.', ru: 'Освежающе фруктовая, 0,33 л.' },
    ingredients: { de: '', en: '', ru: '' },
    allergens: { de: [], en: [], ru: [] },
    price: 2.90,
    image: null,
    vegetarian: true,
    featured: false,
    tag: null
  },
  {
    id: 'sprite',
    name: { de: 'Sprite', en: 'Sprite', ru: 'Спрайт' },
    category: 'getraenke',
    description: { de: 'Zitronen-Limetten-Erfrischung, 0,33l.', en: 'Lemon-lime refreshment, 0.33l.', ru: 'Лимонно-лаймовая свежесть, 0,33 л.' },
    ingredients: { de: '', en: '', ru: '' },
    allergens: { de: [], en: [], ru: [] },
    price: 2.90,
    image: null,
    vegetarian: true,
    featured: false,
    tag: null
  },
  {
    id: 'black-tea',
    name: { de: 'Schwarzer Tee', en: 'Black Tea', ru: 'Черный Чай' },
    category: 'getraenke',
    description: {
      de: 'Traditioneller zentralasiatischer schwarzer Tee, frisch aufgebrüht.',
      en: 'Traditional Central Asian black tea, freshly brewed.',
      ru: 'Традиционный центральноазиатский черный чай, свежезаваренный.'
    },
    ingredients: { de: 'Schwarzer Tee', en: 'Black Tea', ru: 'Черный Чай' },
    allergens: { de: [], en: [], ru: [] },
    price: 3.50,
    image: null,
    vegetarian: true,
    featured: false,
    tag: { de: 'Traditionell', en: 'Traditional', ru: 'Традиционное' }
  },
  {
    id: 'green-tea',
    name: { de: 'Grüner Tee', en: 'Green Tea', ru: 'Зеленый Чай' },
    category: 'getraenke',
    description: {
      de: 'Leichter grüner Tee, serviert in traditioneller Kanne.',
      en: 'Light green tea, served in a traditional pot.',
      ru: 'Легкий зеленый чай, подается в традиционном чайнике.'
    },
    ingredients: { de: 'Grüner Tee', en: 'Green tea', ru: 'Зеленый чай' },
    allergens: { de: [], en: [], ru: [] },
    price: 3.50,
    image: null,
    vegetarian: true,
    featured: false,
    tag: null
  },

  // ─── DESSERTS ───
  {
    id: 'traditional-dessert',
    name: { de: 'Halva', en: 'Halva', ru: 'Халва' },
    category: 'desserts',
    description: {
      de: 'Traditionelles zentralasiatisches Halva — süß, nussig und aromatisch.',
      en: 'Traditional Central Asian Halva — sweet, nutty, and aromatic.',
      ru: 'Традиционная центральноазиатская халва — сладкая, ореховая и ароматная.'
    },
    ingredients: {
      de: 'Mehl, Butter, Zucker, Nüsse',
      en: 'Flour, butter, sugar, nuts',
      ru: 'Мука, сливочное масло, сахар, орехи'
    },
    allergens: { de: ['Gluten', 'Milch', 'Nüsse'], en: ['Gluten', 'Dairy', 'Nuts'], ru: ['Глютен', 'Молоко', 'Орехи'] },
    price: 4.90,
    image: null,
    vegetarian: true,
    featured: false,
    tag: { de: 'Traditionell', en: 'Traditional', ru: 'Традиционное' }
  },
  {
    id: 'sweet-manti',
    name: { de: 'Süße Manti', en: 'Sweet Manti', ru: 'Сладкие Манты' },
    category: 'desserts',
    description: {
      de: 'Süße Teigtaschen gefüllt mit Kürbis, Zimt und Honig.',
      en: 'Sweet dumplings filled with pumpkin, cinnamon, and honey.',
      ru: 'Сладкие мешочки из теста с начинкой из тыквы, корицы и меда.'
    },
    ingredients: {
      de: 'Weizenmehl, Kürbis, Honig, Zimt, Butter',
      en: 'Wheat flour, pumpkin, honey, cinnamon, butter',
      ru: 'Пшеничная мука, тыква, мед, корица, сливочное масло'
    },
    allergens: { de: ['Gluten', 'Milch'], en: ['Gluten', 'Dairy'], ru: ['Глютен', 'Молоко'] },
    price: 6.90,
    image: 'images/menu_veggie.jpg',
    vegetarian: true,
    featured: false,
    tag: { de: 'Besonders', en: 'Special', ru: 'Особенное' }
  },
  {
    id: 'seasonal-dessert',
    name: { de: 'Saisonales Dessert', en: 'Seasonal Dessert', ru: 'Сезонный Десерт' },
    category: 'desserts',
    description: {
      de: 'Unser wechselndes Dessert der Saison — frag das Team nach dem aktuellen Angebot.',
      en: 'Our rotating seasonal dessert — ask the team for the current offering.',
      ru: 'Наш меняющийся сезонный десерт — спросите у команды о текущем предложении.'
    },
    ingredients: {
      de: 'Saisonal wechselnd',
      en: 'Changes seasonally',
      ru: 'Сезонные изменения'
    },
    allergens: { de: [], en: [], ru: [] },
    price: 5.90,
    image: null,
    vegetarian: true,
    featured: false,
    tag: { de: 'Saisonal', en: 'Seasonal', ru: 'Сезонное' }
  }
];

// ─── TRANSLATION HELPER FOR DATA ───
function getLang() {
  return localStorage.getItem('mantihaus_lang') || 'de';
}

function tStr(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[getLang()] || obj['de'] || '';
}

function tArr(obj) {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  return obj[getLang()] || obj['de'] || [];
}

// ─── Utility to get products by category ───
function getProductsByCategory(categoryId) {
  if (categoryId === 'all') return MENU_PRODUCTS;
  return MENU_PRODUCTS.filter(p => p.category === categoryId);
}

function getFeaturedProducts() {
  return MENU_PRODUCTS.filter(p => p.featured);
}

function getProductById(id) {
  return MENU_PRODUCTS.find(p => p.id === id);
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return MENU_PRODUCTS;
  return MENU_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.ingredients && p.ingredients.toLowerCase().includes(q))
  );
}

function formatPrice(price) {
  return `€${price.toFixed(2).replace('.', ',')}`;
}
