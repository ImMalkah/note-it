/**
 * ============================================================
 *  SEED RUNNER
 *  Reads from scripts/seed-config.js and seeds the database
 * ============================================================
 *
 *  RUN:
 *    node scripts/seed.js
 * ============================================================
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const {
  firstNames,
  usernameSuffixes,
  writingStyles,
  boringHumanPosts,
  internetCulturePosts,
  lifeEventPosts,
  regionalPosts,
  socialDramaPosts,
  recurringThoughts,
  typoReplacements,
  config,
} = require('./seed-config');

// ─────────────────────────────────────────────────────────────
//  Supabase client (service role — bypasses RLS)
// ─────────────────────────────────────────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('❌  Missing env vars. Ensure .env.local contains:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL=...');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=...');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─────────────────────────────────────────────────────────────
//  Valid moods from the app
// ─────────────────────────────────────────────────────────────
const VALID_MOODS = [
  'happy', 'excited', 'chill', 'creative',
  'focused', 'tired', 'sad', 'angry', 'anxious', 'grateful',
];

// ─────────────────────────────────────────────────────────────
//  Personality archetypes — each has weighted mood + note pools
// ─────────────────────────────────────────────────────────────
const ARCHETYPES = [
  {
    name: 'sports_fan',
    moods: ['excited', 'anxious', 'happy', 'angry', 'tired'],
    bios: [
      'sports addict • probably watching highlights rn',
      'if there\'s a game on i\'m watching it',
      'stats nerd and proud',
      'my team always breaks my heart',
      'weekends = sports. no exceptions.',
      'bleacher creature since birth',
      'fantasy sports ruined me and i\'d do it again',
    ],
    corePosts: [
      'bro HOW did they choke that lead',
      'playoff basketball is genuinely peak entertainment',
      'refs were absolutely blind tonight',
      'that overtime game took years off my life',
      'i miss when sports felt less corporate',
      'fantasy sports has made me hate players on my own team and this is fine',
      'how do you go from up 3 with 2 minutes left to losing. HOW.',
      'sports documentaries got me crying at 2am again',
      'stadium food prices are criminal. $18 for a hot dog.',
      'another season another disappointment but i\'ll be back',
    ],
    notesPerUser: [3, 14],
  },
  {
    name: 'gamer',
    moods: ['tired', 'excited', 'angry', 'happy', 'focused'],
    bios: [
      'ranked anxiety specialist',
      'one more game → 3am every time',
      'the grind never stops but probably should',
      'FromSoftware is therapy',
      'i have 1000 hours and i\'m still bad',
    ],
    corePosts: [
      'ranked matchmaking is emotional warfare',
      'gaming with friends after work is genuinely therapy',
      'battle passes ruined progression systems',
      'stayed up till 4am for absolutely no reason again',
      'why are gamers either insanely wholesome or completely unhinged',
      'i refuse to pay $70 for a game that needs a $30 season pass',
      'my backlog is a monument to my optimism',
      'rage quitting then coming back five minutes later is a whole cycle',
      'the first hour of a new game fully immersed is unmatched',
    ],
    notesPerUser: [3, 16],
  },
  {
    name: 'music_obsessed',
    moods: ['happy', 'sad', 'chill', 'creative', 'grateful'],
    bios: [
      'currently listening to music instead of fixing my life',
      'music is the only thing that makes sense',
      'my playlist has more range than my emotions',
      'vinyl collector / emotional wreck',
      'the album not the singles',
    ],
    corePosts: [
      'music at 2am hits different fr',
      'old kanye production was actually insane',
      'why does every sad song become 10x better in the rain',
      'sometimes one song can save an entire week',
      'people who talk at concerts should be banned from concerts',
      'the transition from track 3 to track 4 is everything',
      'hearing a song from years ago and being immediately transported is wild',
      'the b-sides are always better. always.',
      'my whole personality for three years was this one album and i\'m not ashamed',
      'sad music when you\'re actually happy is underrated',
    ],
    notesPerUser: [4, 18],
  },
  {
    name: 'tech_bro',
    moods: ['focused', 'excited', 'tired', 'creative'],
    bios: [
      'building things on 3 hours of sleep',
      'shipping > perfecting',
      'indie hacker • failed startup survivor',
      'ai is eating the world and i\'m trying to eat with it',
      'fullstack dev | occasional human being',
      'npm install my way through life',
    ],
    corePosts: [
      'just bought another domain for a project i\'ll definitely finish',
      'why does every startup look exactly the same now',
      'the gap between idea and execution is where dreams go to die',
      'another day another npm vulnerability from 2017',
      'the pivot is always the right call until it isn\'t',
      'open source is held together by 12 exhausted people',
      'documentation is a love language and most devs don\'t speak it',
      'building in public sounds cool until you build in public',
      'everything is a startup now and nothing is a business',
    ],
    notesPerUser: [3, 14],
  },
  {
    name: 'chronically_online',
    moods: ['tired', 'chill', 'anxious', 'happy'],
    bios: [
      'unfortunately aware of every internet drama',
      'main character of my foryou page',
      'my screen time is a cry for help',
      'irony poisoned but self-aware about it',
      'meme archaeologist',
      'i was here before it was cool and after it stopped being cool',
    ],
    corePosts: [
      'i have a meme for every possible situation',
      'my screen time is honestly embarrassing and i refuse to look',
      'i spoke in full internet slang and my family looked terrified',
      'the discourse today was especially unhinged',
      'niche internet communities are the most passionate people on earth',
      'brain rot is not a bug it\'s a feature at this point',
      'the irony layers online are so deep i can\'t tell what\'s sincere',
      'i unironically learned more from youtube than school',
      'parasocial relationships are weird until you have one',
    ],
    notesPerUser: [4, 18],
  },
  {
    name: 'quiet_observer',
    moods: ['chill', 'sad', 'grateful', 'tired', 'happy'],
    bios: [
      'just vibing tbh',
      'here to observe mostly',
      'overthinking things quietly since forever',
      'slow living in a fast world',
      'coffee and quiet mornings',
      'introverted but online',
    ],
    corePosts: [
      'some days you just need to sit with it',
      'i think i need a break but don\'t know from what',
      'the small things matter more than people say',
      'being okay with silence is underrated',
      'why does time move faster as you get older. who approved that',
      'there\'s something peaceful about a really slow day',
      'gratitude sounds cheesy until you actually practice it',
      'the way seasons change still gets me every time',
      'being present is harder than any skill i\'ve tried to learn',
    ],
    notesPerUser: [1, 8],
  },
  {
    name: 'indie_art',
    moods: ['creative', 'sad', 'chill', 'happy', 'grateful'],
    bios: [
      'a24 is my religion',
      'phoebe bridgers and sad movies are a lifestyle',
      'letterboxd top 4 tells you everything',
      'if it didn\'t win an oscar it was probably better',
      'art house cinema and crying in coffee shops',
    ],
    corePosts: [
      'a24 can do no wrong and i stand by that',
      'past lives absolutely destroyed me. still recovering.',
      'i just watched a 3 hour video essay on a film i\'ve never seen',
      'the cinematography alone made me want to change my life',
      'art that makes you uncomfortable is doing its job',
      'the best films make you feel understood without explaining anything',
      'the soundtrack of a film can completely change how you experience it',
      'i need to stop starting creative projects when i should be sleeping',
    ],
    notesPerUser: [3, 12],
  },
  {
    name: 'gym_bro',
    moods: ['focused', 'happy', 'tired', 'excited'],
    bios: [
      'we go gym',
      'bulk szn | cheat day was yesterday',
      'the gym is cheaper than therapy (barely)',
      'rest days are the hardest',
      'protein first. everything else second.',
    ],
    corePosts: [
      'forgot my pre-workout today. pray for me.',
      'the pump was absolutely unreal today',
      'leg day is a spiritual experience',
      'the gym at 6am has a completely different energy',
      'i\'m not addicted to the gym i\'m just there every single day',
      'progressive overload is the answer to most problems in life',
      'the mental clarity after a good workout is the real product',
      'gym friends are built different',
    ],
    notesPerUser: [3, 12],
  },
  {
    name: 'political',
    moods: ['angry', 'anxious', 'focused', 'tired'],
    bios: [
      'trying to stay informed without going insane',
      'media literacy is a survival skill',
      'politically exhausted but still paying attention',
      'read the actual policy not just the headline',
      'the news cycle is designed to exhaust you. resist.',
    ],
    corePosts: [
      'every election cycle feels more insane than the last',
      'politics became team sports and that\'s genuinely dangerous',
      'media outrage cycles are exhausting',
      'nobody reads articles anymore they just react to headlines',
      'the internet rewards anger too much',
      'both sides acting in bad faith simultaneously is exhausting',
      'local politics affects your life more than national stuff and nobody cares',
      'misinformation spreads 10x faster than corrections',
      'democracy requires an informed public and we are failing that',
    ],
    notesPerUser: [2, 10],
  },
  {
    name: 'bookish',
    moods: ['creative', 'chill', 'sad', 'happy', 'focused'],
    bios: [
      'booktok made my tbr unmanageable',
      'i buy more books than i read. on purpose.',
      'reader of many genres, finisher of few',
      'the library is free therapy',
      'physical books only',
    ],
    corePosts: [
      'i just bought 5 books i won\'t read because the covers are pretty',
      'enemies to lovers slow burn is the superior romance trope',
      'why does every fantasy series end on the worst possible note',
      'a book hangover is real and brutal',
      'the book was better. it\'s always the book.',
      'reading before bed is the only wind-down that actually works',
      'dnf is not giving up it\'s self respect',
      'finding a book that feels written specifically for you is magical',
      'rereads hit differently when you\'re older',
    ],
    notesPerUser: [2, 12],
  },
  {
    name: 'foodie',
    moods: ['happy', 'chill', 'excited', 'grateful'],
    bios: [
      'rating every matcha in the city',
      'food is love language #1',
      'home cook but make it experimental',
      'brunch wait times are worth it. mostly.',
      'menu photographer | unapologetic about it',
    ],
    corePosts: [
      'i just found the best hidden gem cafe. no i won\'t drop the location.',
      'why is eating out so expensive now. $25 for a salad is criminal.',
      'the bread at that place is the reason i believe in something',
      'home cooking is better when you have no plan going in',
      'the atmosphere of a cafe matters as much as the coffee',
      'finding a restaurant with good vibes AND good food is rare',
      'i judge a restaurant by how they do their simplest dish',
    ],
    notesPerUser: [2, 10],
  },
];

// ─────────────────────────────────────────────────────────────
//  All general content pools merged (for cross-persona realism)
// ─────────────────────────────────────────────────────────────
const GENERAL_POOL = [
  ...boringHumanPosts,
  ...internetCulturePosts,
  ...lifeEventPosts,
  ...regionalPosts,
  ...socialDramaPosts,
];

// Random endings to append
const ENDINGS = [
  '', '', '', '', // empty = no ending (weighted)
  'idk maybe thats just me',
  'anyways',
  'cant stop thinking about it',
  'fr tho',
  'wild times',
  'what do yall think?',
  'honestly',
  'lmao',
  'make it make sense',
  'no thoughts head empty',
  'ok rant over',
  'not elaborating further',
  'but what do i know',
  'this is fine',
  'send help',
  'i need sleep',
];

// ─────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────
const pick   = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand   = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function makeUsername() {
  const name   = pick(firstNames);
  const suffix = pick(usernameSuffixes);
  const num    = rand(1, 9999);
  // clean dots/spaces that might exist in internet-native names
  const cleanName = name.replace(/[^a-z0-9_]/gi, '');
  return `${cleanName}_${suffix}${num}`.toLowerCase();
}

function makeNoteContent(archetype) {
  // 20% chance: pull from general human pool for realism
  const useGeneral = Math.random() < 0.20;
  // 5% chance: use a recurring thought chain
  const useChain   = Math.random() < 0.05;

  let base;
  if (useChain && recurringThoughts.length > 0) {
    const chain = pick(recurringThoughts);
    base = pick(chain);
  } else if (useGeneral) {
    base = pick(GENERAL_POOL);
  } else {
    base = pick(archetype.corePosts);
  }

  const ending  = pick(ENDINGS);
  let content   = ending ? `${base} ${ending}` : base;

  // Occasional realistic typos
  if (config.realisticTypos) {
    for (const [word, typo] of Object.entries(typoReplacements)) {
      if (Math.random() < 0.05) {
        content = content.replace(new RegExp(`\\b${word}\\b`, 'i'), typo);
        break; // only one typo per note
      }
    }
  }

  return content;
}

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ─────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱  Starting seed...\n');
  console.log(`   Archetypes      : ${ARCHETYPES.length}`);
  console.log(`   General pool    : ${GENERAL_POOL.length} posts`);
  console.log(`   Users to create : ${config.totalUsers}`);
  console.log(`   Follow attempts : ${config.followAttempts}`);
  console.log(`   Like attempts   : ${config.likeAttempts}`);
  console.log(`   Save attempts   : ${config.saveAttempts}`);
  console.log('');

  const userIds = [];
  const noteIds = [];
  let created = 0;
  let skipped = 0;

  // ── 1. USERS + NOTES ──────────────────────────────────────
  console.log('👤  Creating users and notes...');

  for (let i = 0; i < config.totalUsers; i++) {
    const archetype  = pick(ARCHETYPES);
    const username   = makeUsername();
    const email      = `${username}_${Date.now()}_${i}@seed.example.com`;
    const avatarUrl  = `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`;
    const mood       = pick(archetype.moods);
    const bio        = pick(archetype.bios);

    // Power user: posts much more
    const isPowerUser = config.powerUsersPercentage > 0 && Math.random() < config.powerUsersPercentage;
    // Inactive: posts very little
    const isInactive  = config.inactiveAccountsPercentage > 0 && Math.random() < config.inactiveAccountsPercentage;

    const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
      email,
      password: 'password123',
      email_confirm: true,
      user_metadata: { username },
    });

    if (authErr) {
      skipped++;
      continue;
    }

    const userId = authData.user.id;
    userIds.push(userId);
    created++;

    // Update profile
    await supabase.from('profiles').update({
      bio,
      avatar_url : avatarUrl,
      mood,
      instagram  : username,
      snapchat   : `${username}_snap`,
    }).eq('id', userId);

    // Determine how many notes to create
    let [minN, maxN] = archetype.notesPerUser;
    if (isPowerUser) { minN = maxN; maxN = maxN * 3; }
    if (isInactive)  { minN = 0; maxN = 2; }
    const numNotes = rand(minN, maxN);

    const notesToInsert = [];
    for (let j = 0; j < numNotes; j++) {
      const daysAgo = rand(0, 700);
      notesToInsert.push({
        content    : makeNoteContent(archetype),
        author_id  : userId,
        mood,
        created_at : new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
      });
    }

    if (notesToInsert.length > 0) {
      const { data: inserted } = await supabase
        .from('notes')
        .insert(notesToInsert)
        .select('id');
      if (inserted) inserted.forEach((n) => noteIds.push(n.id));
    }

    if ((i + 1) % 100 === 0) {
      console.log(`   ... ${i + 1}/${config.totalUsers} processed  (${created} created, ${skipped} skipped, ${noteIds.length} notes so far)`);
    }
  }

  console.log(`✅  Users: ${created} created, ${skipped} skipped`);
  console.log(`✅  Notes: ${noteIds.length} created\n`);

  if (userIds.length === 0 || noteIds.length === 0) {
    console.error('❌  Nothing to build social graph on. Exiting.');
    return;
  }

  // ── 2. FOLLOWS ────────────────────────────────────────────
  console.log(`👥  Generating follows (${config.followAttempts} attempts)...`);
  const followPairs = new Set();
  const followRows  = [];

  for (let i = 0; i < config.followAttempts; i++) {
    const a   = pick(userIds);
    const b   = pick(userIds);
    const key = `${a}:${b}`;
    if (a !== b && !followPairs.has(key)) {
      followPairs.add(key);
      followRows.push({
        follower_id  : a,
        following_id : b,
        created_at   : new Date(Date.now() - rand(0, 700) * 86_400_000).toISOString(),
      });
    }
  }
  for (const batch of chunk(followRows, 500)) {
    await supabase.from('user_follows').upsert(batch, { onConflict: 'follower_id,following_id', ignoreDuplicates: true });
  }
  console.log(`✅  Follows: ${followRows.length}\n`);

  // ── 3. LIKES ──────────────────────────────────────────────
  console.log(`❤️   Generating likes (${config.likeAttempts} attempts)...`);
  const likePairs = new Set();
  const likeRows  = [];

  for (let i = 0; i < config.likeAttempts; i++) {
    const u   = pick(userIds);
    const n   = pick(noteIds);
    const key = `${u}:${n}`;
    if (!likePairs.has(key)) {
      likePairs.add(key);
      likeRows.push({
        user_id    : u,
        note_id    : n,
        created_at : new Date(Date.now() - rand(0, 700) * 86_400_000).toISOString(),
      });
    }
  }
  for (const batch of chunk(likeRows, 500)) {
    await supabase.from('note_likes').upsert(batch, { onConflict: 'user_id,note_id', ignoreDuplicates: true });
  }
  console.log(`✅  Likes: ${likeRows.length}\n`);

  // ── 4. SAVES ──────────────────────────────────────────────
  console.log(`🔖  Generating saves (${config.saveAttempts} attempts)...`);
  const savePairs = new Set();
  const saveRows  = [];

  for (let i = 0; i < config.saveAttempts; i++) {
    const u   = pick(userIds);
    const n   = pick(noteIds);
    const key = `${u}:${n}`;
    if (!savePairs.has(key)) {
      savePairs.add(key);
      saveRows.push({
        user_id    : u,
        note_id    : n,
        created_at : new Date(Date.now() - rand(0, 700) * 86_400_000).toISOString(),
      });
    }
  }
  for (const batch of chunk(saveRows, 500)) {
    await supabase.from('saved_notes').upsert(batch, { onConflict: 'user_id,note_id', ignoreDuplicates: true });
  }
  console.log(`✅  Saves: ${saveRows.length}\n`);

  // ── DONE ──────────────────────────────────────────────────
  console.log('🎉  Seed complete!\n');
  console.log('─────────────────────────────────');
  console.log(`  Users   : ${created}`);
  console.log(`  Notes   : ${noteIds.length}`);
  console.log(`  Follows : ${followRows.length}`);
  console.log(`  Likes   : ${likeRows.length}`);
  console.log(`  Saves   : ${saveRows.length}`);
  console.log('─────────────────────────────────\n');
}

main().catch((err) => {
  console.error('❌  Seed failed:', err.message);
  process.exit(1);
});
