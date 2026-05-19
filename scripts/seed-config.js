/**
 * ============================================================
 *  REALISTIC HUMAN SOCIAL SEED EXPANSION
 * ============================================================
 *
 *  ADDITIONS:
 *   - relationship dynamics
 *   - writing styles
 *   - internet micro-behaviors
 *   - boring everyday posts
 *   - emotional continuity
 *   - regional/cultural references
 *   - recurring themes
 *   - realistic username styles
 *   - inconsistent grammar / punctuation
 *   - doomscroll culture
 *   - creator burnout
 *   - modern economy stress
 *   - parasocial internet culture
 *
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
// USERNAME GENERATION
// ─────────────────────────────────────────────────────────────

const firstNames = [
  'alex', 'sam', 'jay', 'nina', 'mike', 'jordan', 'david', 'sarah',
  'emily', 'leo', 'ethan', 'luna', 'ava', 'ryan', 'tyler', 'mia',
  'zack', 'josh', 'olivia', 'noah', 'liam', 'emma', 'sofia', 'chloe',
  'maya', 'kai', 'drew', 'river', 'quinn', 'blake', 'sage', 'reef',
  'dante', 'felix', 'ivan', 'nadia', 'priya', 'omar', 'layla', 'miles',
  'zoe', 'ada', 'casey', 'remi', 'juno', 'eli', 'tara', 'ash',

  // internet-native names
  'sleepyemma',
  'sadluna',
  'voidkai',
  'pixeljay',
  'midnightmia',
  'retroreef',
  'etherealava',
  'blurryjosh',
  'ghostnoah',
  'offlineleo',
  'sammy',
  'nightsbyriver',
  'lowbattery',
  'dailymia',
  'voidposting',
  'afterdarkalex',
  'caffeinatedkai',
  'lonelyjordan',
  '404sam',
  'josh.wav',
  'kai.mp3',
  'emma.jpeg',
  'ninaonline',
  'oliviaarchive',
  'sofiacore',
  'liamirl',
  'moodysarah',
  'sleepdeprivedleo',
  'late_night_ava',
];

const usernameSuffixes = [
  'tv', 'lol', 'live', 'real', 'daily', 'archive', 'central',
  'wave', 'vibes', 'zone', 'online', 'core', 'era', 'posting',
  'world', 'feed', 'updates', 'thoughts', 'log', 'notes', 'takes',
  'diary', 'brain', 'dot', 'etc', 'irl', 'hq', 'xyz',

  // internet culture
  'postingagain',
  'afterdark',
  'brainrot',
  'thread',
  'jpeg',
  'mp3',
  'wav',
  'alt',
  'burner',
  'private',
  'spam',
  'archive2',
  'v2',
  'corecore',
  'deluxe',
  'finalfinal',
  'backup',
  'uncut',
  'realreal',
  'thoughtdump',
];

// ─────────────────────────────────────────────────────────────
// WRITING STYLES
// ─────────────────────────────────────────────────────────────

const writingStyles = [

  {
    name: 'lowercase_casual',
    emojiFrequency: 0.25,
    typoChance: 0.07,
    punctuation: 'minimal',
    favoriteWords: ['lowkey', 'honestly', 'bro', 'ngl'],
  },

  {
    name: 'dramatic',
    emojiFrequency: 0.45,
    typoChance: 0.02,
    punctuation: 'heavy',
    favoriteWords: ['literally', 'actually', 'genuinely', 'insane'],
  },

  {
    name: 'doomscroll',
    emojiFrequency: 0.15,
    typoChance: 0.04,
    punctuation: 'none',
    favoriteWords: ['dystopian', 'cooked', 'brainrot', 'algorithm'],
  },

  {
    name: 'overthinker',
    emojiFrequency: 0.08,
    typoChance: 0.03,
    punctuation: 'normal',
    favoriteWords: ['sometimes', 'weirdly', 'honestly', 'probably'],
  },

  {
    name: 'hyper_online',
    emojiFrequency: 0.4,
    typoChance: 0.09,
    punctuation: 'chaotic',
    favoriteWords: ['😭', 'lmao', 'nah', 'bro'],
  },

];

// ─────────────────────────────────────────────────────────────
// RELATIONSHIP DYNAMICS
// ─────────────────────────────────────────────────────────────

const relationshipStyles = [

  'always replying to mutuals',
  'lurks but likes everything',
  'chronically in arguments',
  'groupchat comedian',
  'posts vague emotional notes',
  'online at 3am constantly',
  'disappears for months then posts 14 notes in one night',
  'sends memes instead of emotions',
  'parasocial with creators',
  'never posts but saves everything',
  'active only during major world events',
  'always reacting to sports losses',
  'doomscrolls during work',
  'treats mutuals like lifelong friends',
  'main character syndrome but self-aware',
];

// ─────────────────────────────────────────────────────────────
// BORING HUMAN POSTS
// CRITICAL FOR REALISM
// ─────────────────────────────────────────────────────────────

const boringHumanPosts = [

  'i forgot why i opened my phone again',
  'laundry is never actually finished',
  'why do grocery stores feel dystopian at midnight',
  'i need to stop drinking coffee this late',
  'i waved back at someone who wasnt waving at me',
  'the weather changed my mood instantly',
  'i cleaned my room and somehow made it worse',
  'my sleep schedule is completely fictional now',
  'the fridge has no food but somehow its full',
  'today felt like 4 different days somehow',
  'i hate when youtube autoplay knows exactly what mood im in',
  'the older i get the more errands appear out of nowhere',
  'i need like 3 business days to recover from social interaction',
  'i miss when apps were just apps',
  'why does every subscription suddenly cost $20 now',
  'my attention span is absolutely fried',
  'being perceived is exhausting sometimes',
  'i should probably go outside more',
  'i need to stop checking my phone the second i wake up',
  'the amount of tabs open on my browser says a lot about me',
  'i thought adulthood came with more free time somehow',
  'my screen time report was genuinely disrespectful',
  'the grocery store lighting makes me feel like an npc',
  'i sat down for 5 minutes and suddenly it was dark outside',
];

// ─────────────────────────────────────────────────────────────
// MODERN INTERNET / CULTURE POSTS
// ─────────────────────────────────────────────────────────────

const internetCulturePosts = [

  'every app turning into tiktok was the beginning of the end',
  'instagram comments are funnier than actual comedy now',
  '2016 internet culture permanently altered my brain chemistry',
  'we normalized being reachable 24/7 and that was definitely a mistake',
  'the algorithm understands me better than some people do',
  'everyone online talks like theyre in a podcast clip now',
  'the internet somehow feels both too crowded and too lonely',
  'creator burnout is becoming impossible to ignore',
  'half the internet discourse isnt even real people anymore',
  'everything becomes content eventually and thats weird',
  'the amount of irony online makes sincerity feel illegal',
  'i genuinely cannot tell when people are joking anymore',
  'the internet moves on from huge events in like 36 hours now',
  'doomscrolling before bed is self sabotage but i continue',
  'everyone acts detached online but clearly cares deeply',
  'the line between authentic and performative disappeared years ago',
  'social media made everyone hyper aware of themselves',
  'every platform eventually becomes the same app somehow',
  'brainrot humor is becoming a real dialect',
];

// ─────────────────────────────────────────────────────────────
// LIFE EVENTS / PERSONAL POSTS
// ─────────────────────────────────────────────────────────────

const lifeEventPosts = [

  'moving to a new city is exciting until youre alone in the grocery store',
  'my cat has genuinely improved my mental health',
  'breakups make even normal places feel haunted for a while',
  'graduating feels less like accomplishment and more like confusion',
  'i finally got a job interview and now im terrified',
  'watching your parents get older changes something in your brain',
  'burnout sneaks up on you slowly then all at once',
  'i miss my friends even though we text every day',
  'the post concert depression is very real',
  'starting over in your mid 20s feels weirdly common now',
  'i think everyone is more lonely than they admit',
  'being an adult is mostly scheduling things correctly',
  'remote work destroyed my sense of time completely',
  'i miss when hanging out didnt require planning two weeks ahead',
  'i didnt realize how stressed i was until i finally relaxed',
  'getting older is realizing your parents were improvising too',
];

// ─────────────────────────────────────────────────────────────
// REGIONAL / CULTURAL POSTS
// ─────────────────────────────────────────────────────────────

const regionalPosts = [

  'the TTC delay almost made me lose my mind today',
  'night shift completely destroyed my sleep schedule',
  'customer service should count as emotional endurance training',
  'my mom still thinks coding means fixing printers',
  'toronto rent prices are becoming satire',
  'taking transit during rush hour builds character i guess',
  'canadians will apologize for literally anything',
  'winter depression hits different when the sun disappears at 4pm',
  'everyone in this city walks insanely fast for no reason',
  'hearing 4 different languages on one subway ride is actually beautiful',
  'immigrant parents really mastered sacrificing everything quietly',
  'why does every cafe suddenly have minimalist concrete walls now',
  'the amount of international students surviving on caffeine deserves respect',
];

// ─────────────────────────────────────────────────────────────
// SOFT DRAMA POSTS
// ─────────────────────────────────────────────────────────────

const socialDramaPosts = [

  'some people really should learn how to apologize',
  'muting people is honestly self care',
  'there are people who genuinely thrive on conflict online',
  'vague posting is annoying until youre the one doing it',
  'i hate internet pile-ons even when the person deserves criticism',
  'people screenshot conversations way too casually now',
  'friendship breakups are weirdly harder than actual breakups',
  'some people only text when they need validation',
  'every groupchat has lore that could destroy careers',
  'being misunderstood online is such a strange feeling',
];

// ─────────────────────────────────────────────────────────────
// MICRO TYPO / HUMAN MISTAKE POOL
// ─────────────────────────────────────────────────────────────

const typoReplacements = {
  'the': 'teh',
  'really': 'rly',
  'people': 'ppl',
  'because': 'bc',
  'though': 'tho',
  'something': 'smth',
  'you': 'u',
  'your': 'ur',
};

// ─────────────────────────────────────────────────────────────
// NOTE CHAINS
// USERS REVISIT SAME TOPICS
// ─────────────────────────────────────────────────────────────

const recurringThoughts = [

  [
    'i need to sleep earlier',
    'update: still awake at 3am',
    'this is becoming an actual issue',
  ],

  [
    'trying to spend less time online',
    'screen time somehow went UP',
    'we are not improving but thats ok',
  ],

  [
    'i should start going to the gym consistently',
    'went once and now my body hurts',
    'actually kinda worth it tho',
  ],

  [
    'trying to save money this month',
    'why is existing so expensive',
    'i bought food and suddenly im broke again',
  ],

];

// ─────────────────────────────────────────────────────────────
// ADD THESE TO EXISTING PERSONAS
// ─────────────────────────────────────────────────────────────

/*
FOR EACH PERSONA ADD:

relationshipStyle:
  relationshipStyles[Math.floor(Math.random() * relationshipStyles.length)]

writingStyle:
  writingStyles[Math.floor(Math.random() * writingStyles.length)]

ALSO MERGE:
  boringHumanPosts
  internetCulturePosts
  lifeEventPosts
  regionalPosts
  socialDramaPosts

INTO EACH PERSONA'S notes[] POOL
AT LOW RANDOM FREQUENCY.

THIS IS IMPORTANT:
NOT EVERY NOTE SHOULD MATCH THEIR MAIN INTEREST.
REAL PEOPLE ARE INCONSISTENT.
*/

// ─────────────────────────────────────────────────────────────
// TIMESTAMP REALISM
// ─────────────────────────────────────────────────────────────

const postingPatterns = {

  nightOwl: {
    preferredHours: [0, 1, 2, 3, 23],
  },

  officeWorker: {
    preferredHours: [7, 8, 12, 18, 22],
  },

  doomscroller: {
    preferredHours: [1, 2, 11, 15, 23],
  },

  student: {
    preferredHours: [0, 1, 16, 19, 22],
  },

};

// ─────────────────────────────────────────────────────────────
// SEED SETTINGS
// ─────────────────────────────────────────────────────────────

const config = {
  totalUsers: 1200,
  followAttempts: 40000,
  likeAttempts: 150000,
  saveAttempts: 70000,

  relationshipBias: true,
  personalityBasedInteractions: true,
  recurringThoughtsEnabled: true,
  realisticTypos: true,
  inactiveAccountsPercentage: 0.15,
  powerUsersPercentage: 0.05,
};

module.exports = {
  firstNames,
  usernameSuffixes,
  writingStyles,
  relationshipStyles,
  boringHumanPosts,
  internetCulturePosts,
  lifeEventPosts,
  regionalPosts,
  socialDramaPosts,
  typoReplacements,
  recurringThoughts,
  postingPatterns,
  config,
};