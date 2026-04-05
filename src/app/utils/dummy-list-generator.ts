/**
 * Dummy List Generator
 *
 * Generates realistic lists with contextually relevant items.
 * Produces the same shape as the real list creation path:
 * { id: string; title: string; items: { text: string; completed: boolean }[] }
 */

interface ListItem {
  text: string;
  completed: boolean;
}

export interface GeneratedList {
  id: string;
  title: string;
  items: ListItem[];
  sortMode: 'alphabetical' | 'insertion';
  smartReminders: boolean;
  smartReminderDueDate?: string | null;
  status?: 'active' | 'done' | 'deleted';
  statusChangedAt?: number | null;
}

// Each entry: [listTitle, ...possible items related to that title]
const LIST_TEMPLATES: [string, string[]][] = [
  ['Grocery shopping', [
    'Milk', 'Eggs', 'Bread', 'Butter', 'Chicken breast', 'Rice', 'Pasta',
    'Tomatoes', 'Onions', 'Garlic', 'Olive oil', 'Cheese', 'Yoghurt',
    'Bananas', 'Apples', 'Spinach', 'Carrots', 'Potatoes', 'Coffee', 'Orange juice',
  ]],
  ['Weekend trip packing', [
    'Toothbrush', 'Phone charger', 'Sunscreen', 'Swimsuit', 'Towel',
    'Sunglasses', 'Snacks for the drive', 'Camera', 'Book to read',
    'Comfortable shoes', 'Rain jacket', 'Headphones', 'Water bottle',
    'Spare socks', 'Travel pillow',
  ]],
  ['Home renovation ideas', [
    'Paint living room walls', 'Replace kitchen tap', 'New curtains for bedroom',
    'Fix squeaky door hinge', 'Install floating shelves', 'Re-grout bathroom tiles',
    'Replace hallway light fixture', 'Sand and stain deck', 'Add window boxes',
    'Upgrade front door handle', 'Organise garage', 'Replace shower head',
  ]],
  ['Birthday party planning', [
    'Send invitations', 'Order cake', 'Buy balloons', 'Make playlist',
    'Get paper plates and napkins', 'Plan party games', 'Buy candles',
    'Arrange table decorations', 'Pick up drinks', 'Prepare goodie bags',
    'Set up photo booth', 'Organise seating', 'Confirm guest count',
  ]],
  ['Books to read', [
    'Atomic Habits', 'The Midnight Library', 'Project Hail Mary',
    'Educated', 'Sapiens', 'The Alchemist', 'Dune', 'Normal People',
    'Thinking, Fast and Slow', 'The Great Gatsby', 'Becoming',
    'The Subtle Art of Not Giving a F*ck', 'Where the Crawdads Sing',
  ]],
  ['Workout routine', [
    'Warm-up stretches', '20 push-ups', '30 squats', 'Plank for 60 seconds',
    '15 lunges each leg', '10 burpees', 'Jump rope 3 minutes',
    '20 sit-ups', 'Cool-down walk', 'Foam roll legs',
    'Resistance band rows', 'Dumbbell curls', 'Mountain climbers',
  ]],
  ['Movies to watch', [
    'The Shawshank Redemption', 'Inception', 'Parasite',
    'Everything Everywhere All at Once', 'The Grand Budapest Hotel',
    'Interstellar', 'Whiplash', 'Get Out', 'Coco',
    'The Dark Knight', 'La La Land', 'Arrival', 'Jojo Rabbit',
  ]],
  ['Garden tasks', [
    'Mow the lawn', 'Prune rose bushes', 'Plant tomato seedlings',
    'Weed flower beds', 'Fertilise lawn', 'Water herb garden',
    'Trim hedges', 'Repot succulents', 'Clean bird feeder',
    'Spread mulch', 'Fix garden fence', 'Plant spring bulbs',
  ]],
  ['Kitchen clean-up', [
    'Wipe down countertops', 'Clean inside microwave', 'Empty and reload dishwasher',
    'Scrub stovetop', 'Organise spice rack', 'Clean out fridge',
    'Wash cutting boards', 'Descale kettle', 'Wipe cabinet fronts',
    'Clean sink drain', 'Replace sponge', 'Sweep kitchen floor',
  ]],
  ['Holiday gift ideas', [
    'Scented candle for mum', 'Leather wallet for dad', 'Art supplies for Lily',
    'Board game for the family', 'Coffee subscription for Tom',
    'Cookbook for Sarah', 'Wireless earbuds for Jake', 'Skincare set for Emma',
    'Gift card for the neighbours', 'Wine for the host', 'Toy for the dog',
    'Puzzle for grandma', 'Socks for uncle Dave',
  ]],
  ['Morning routine', [
    'Wake up at 6:30', 'Drink a glass of water', 'Meditate for 10 minutes',
    'Stretch', 'Make the bed', 'Shower', 'Prepare breakfast',
    'Review daily goals', 'Check calendar', 'Pack lunch',
    'Leave by 8:00', 'Listen to podcast on commute',
  ]],
  ['Camping checklist', [
    'Tent', 'Sleeping bag', 'Camp stove', 'Matches', 'First aid kit',
    'Flashlight', 'Insect repellent', 'Cooler with ice', 'Marshmallows',
    'Firewood', 'Pocket knife', 'Map of the area', 'Extra batteries',
    'Tarp', 'Rope',
  ]],
  ['Study plan', [
    'Review chapter 5 notes', 'Practice calculus problems', 'Read assigned paper',
    'Write essay outline', 'Make flashcards for vocab', 'Watch lecture recording',
    'Meet study group at library', 'Submit homework online', 'Email professor question',
    'Prepare presentation slides', 'Proofread lab report',
  ]],
  ['Meal prep ideas', [
    'Chicken stir-fry with veggies', 'Overnight oats', 'Greek salad jars',
    'Turkey meatballs with rice', 'Lentil soup', 'Egg muffin cups',
    'Quinoa and black bean bowls', 'Pasta with marinara', 'Grilled salmon with asparagus',
    'Smoothie packs', 'Chicken Caesar wraps', 'Veggie chilli',
  ]],
  ['New apartment to-do', [
    'Set up internet', 'Change address at post office', 'Unpack kitchen boxes',
    'Hang curtains', 'Assemble bookshelf', 'Buy shower curtain',
    'Get spare keys made', 'Meet the neighbours', 'Stock cleaning supplies',
    'Register with local GP', 'Set up utilities', 'Buy doormat',
  ]],
  ['Date night ideas', [
    'Cook dinner together', 'Try the new Italian place', 'Picnic in the park',
    'Movie marathon at home', 'Pottery painting class', 'Sunset walk by the river',
    'Board game night', 'Visit the farmers market', 'Karaoke night',
    'Stargazing', 'Wine tasting', 'Escape room',
  ]],
  ['Side project ideas', [
    'Build a personal portfolio site', 'Create a budgeting app',
    'Write a blog post about React', 'Learn a new programming language',
    'Contribute to open source', 'Design a mobile app mockup',
    'Build a CLI tool', 'Start a newsletter', 'Make a browser extension',
    'Create an API wrapper', 'Automate a daily task',
  ]],
  ['Car maintenance', [
    'Change engine oil', 'Rotate tyres', 'Replace wiper blades',
    'Check brake pads', 'Top up coolant', 'Replace cabin air filter',
    'Check tyre pressure', 'Clean interior', 'Wax exterior',
    'Inspect battery terminals', 'Refill washer fluid', 'Check headlights',
  ]],
  ['Travel bucket list', [
    'Visit Kyoto in cherry blossom season', 'Road trip along the Amalfi Coast',
    'See the Northern Lights in Iceland', 'Explore Machu Picchu',
    'Safari in the Serengeti', 'Cruise through Norwegian fjords',
    'Walk the Camino de Santiago', 'Snorkel the Great Barrier Reef',
    'Visit the Christmas markets in Vienna', 'Hike in Patagonia',
  ]],
  ['Weekly chores', [
    'Vacuum the house', 'Do laundry', 'Clean bathrooms', 'Take out rubbish',
    'Dust shelves', 'Mop floors', 'Change bed sheets', 'Wipe mirrors',
    'Tidy desk', 'Water houseplants', 'Sort recycling', 'Iron shirts',
  ]],
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function randomFutureDueDate(): string {
  const date = new Date();
  const offsetDays = Math.floor(Math.random() * 60) + 1;
  date.setDate(date.getDate() + offsetDays);
  return formatDateOnly(date);
}

type ListCategory = 'complete' | 'almost' | 'started' | 'todo';

function applyCompletionForCategory(items: ListItem[], category: ListCategory): ListItem[] {
  const total = items.length;
  switch (category) {
    case 'complete':
      return items.map(i => ({ ...i, completed: true }));
    case 'almost': {
      // 50-99% completed
      const target = Math.max(Math.ceil(total * 0.5), Math.min(total - 1, Math.floor(Math.random() * total * 0.5) + Math.ceil(total * 0.5)));
      const shuffled = shuffleArray(items.map((_, idx) => idx));
      const completedSet = new Set(shuffled.slice(0, target));
      return items.map((item, idx) => ({ ...item, completed: completedSet.has(idx) }));
    }
    case 'started': {
      // 1 to <50% completed
      const maxCompleted = Math.max(1, Math.ceil(total * 0.5) - 1);
      const target = Math.floor(Math.random() * maxCompleted) + 1;
      const shuffled = shuffleArray(items.map((_, idx) => idx));
      const completedSet = new Set(shuffled.slice(0, target));
      return items.map((item, idx) => ({ ...item, completed: completedSet.has(idx) }));
    }
    case 'todo':
      return items.map(i => ({ ...i, completed: false }));
  }
}

export function generateDummyLists(
  numberOfLists: number,
  maxListItems: number,
  includeDoneItems: boolean,
  includeSmartReminderLists: boolean,
): GeneratedList[] {
  const count = Math.max(4, Math.min(numberOfLists, LIST_TEMPLATES.length));
  const allTemplates = shuffleArray(LIST_TEMPLATES);

  // Guarantee one list per filter category
  const categories: ListCategory[] = ['complete', 'almost', 'started', 'todo'];
  const guaranteedTemplates = allTemplates.slice(0, 4);
  const remainingTemplates = allTemplates.slice(4, count);
  const maxSmartReminderLists = includeSmartReminderLists ? Math.min(4, count) : 0;
  let smartReminderListsAssigned = 0;
  const shouldUseSmartReminder = () => {
    if (!includeSmartReminderLists) return false;
    if (smartReminderListsAssigned >= maxSmartReminderLists) return false;
    const remainingSlots = maxSmartReminderLists - smartReminderListsAssigned;
    const useSmartReminder = Math.random() < 0.5 || remainingSlots > (count - (smartReminderListsAssigned + 1));
    if (useSmartReminder) {
      smartReminderListsAssigned += 1;
      return true;
    }
    return false;
  };

  const guaranteedLists: GeneratedList[] = guaranteedTemplates.map(([title, allItems], idx) => {
    const itemCount = Math.max(2, Math.floor(Math.random() * maxListItems) + 1);
    const selectedItems = shuffleArray(allItems).slice(0, Math.min(itemCount, allItems.length));
    const items = applyCompletionForCategory(
      selectedItems.map(text => ({ text, completed: false })),
      categories[idx],
    );
    const smartReminders = shouldUseSmartReminder();
    return {
      id: crypto.randomUUID(),
      title,
      items,
      sortMode: 'insertion',
      smartReminders,
      smartReminderDueDate: smartReminders ? randomFutureDueDate() : null,
    };
  });

  const extraLists: GeneratedList[] = remainingTemplates.map(([title, allItems]) => {
    const itemCount = Math.max(1, Math.floor(Math.random() * maxListItems) + 1);
    const selectedItems = shuffleArray(allItems).slice(0, Math.min(itemCount, allItems.length));
    const items: ListItem[] = selectedItems.map(text => {
      const completed = includeDoneItems && Math.random() < 0.3;
      return { text, completed };
    });
    const smartReminders = shouldUseSmartReminder();
    return {
      id: crypto.randomUUID(),
      title,
      items,
      sortMode: 'insertion',
      smartReminders,
      smartReminderDueDate: smartReminders ? randomFutureDueDate() : null,
    };
  });

  return [...guaranteedLists, ...extraLists];
}
