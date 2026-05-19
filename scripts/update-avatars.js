/**
 * ============================================================
 *  UPDATE AVATARS
 *  Assigns gender-appropriate, personality-matched avatars
 *  to all users based on their username. Skips protected accounts.
 *
 *  Avatar sources used:
 *    - randomuser.me  → realistic photo portraits (men/women, IDs 1–99)
 *    - DiceBear lorelei     → cute/anime feminine style
 *    - DiceBear adventurer  → adventurous / neutral
 *    - DiceBear bottts      → robot / tech / masculine coded
 *    - DiceBear pixel-art   → gamer / retro
 *    - DiceBear notionists  → soft / aesthetic / gender-neutral
 *    - DiceBear fun-emoji   → chaotic / chronically-online
 *    - DiceBear thumbs      → generic fallback
 *
 *  RUN:
 *    node scripts/update-avatars.js
 * ============================================================
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const PROTECTED = new Set(['fastifan', 'lexylexy', 'malkah']);

// ─────────────────────────────────────────────────────────────
//  Gender / vibe signals in usernames
// ─────────────────────────────────────────────────────────────

const FEMININE_SIGNALS = [
  'luna', 'maya', 'mia', 'zoe', 'ava', 'ivy', 'lyra', 'faye', 'jade',
  'iris', 'nina', 'nadia', 'layla', 'priya', 'vera', 'kira', 'petra',
  'mara', 'zara', 'emma', 'lily', 'piper', 'eden', 'remi', 'rue',
  'bex', 'quinn', 'nova', 'girl', 'femme', 'baby', 'babe', 'angel',
  'fairy', 'witch', 'kawaii', 'pretty', 'soft', 'sweet', 'pastel',
  'cottagecore', 'sadgirl', 'ratgirl', 'girlboss', 'glitter', 'pink',
  'princess', 'darling', 'lovely', 'bloom', 'petal', 'rosie', 'daisy',
  'aesthetic', 'lofi', 'ethereal', 'delicate', 'gentle',
];

const MASCULINE_SIGNALS = [
  'leo', 'eli', 'max', 'fin', 'dex', 'cas', 'cole', 'nico', 'reed',
  'theo', 'ezra', 'luca', 'soren', 'omar', 'miles', 'jake', 'beau',
  'gray', 'drew', 'blake', 'tate', 'lake', 'bro', 'dude', 'guy',
  'king', 'alpha', 'sigma', 'grind', 'gym', 'gains', 'sport', 'goals',
  'hustle', 'beast', 'gamer', 'ranked', 'frag', 'clutch', 'mlg',
  'gaming', 'tech', 'dev', 'code', 'build', 'ship', 'nerd', 'geek',
  'robot', 'pixel', 'hacker', 'football', 'basketball', 'soccer',
];

const TECH_SIGNALS = [
  'pixel', 'byte', 'bit', 'hex', 'dev', 'code', 'tech', 'robot',
  'cyber', 'hacker', 'glitch', 'debug', 'stack', 'api', 'cloud',
  'neural', 'algo', 'ml', 'ai', 'gpt', 'bot', 'script', 'kernel',
];

const GAMER_SIGNALS = [
  'gamer', 'gaming', 'ranked', 'frag', 'clutch', 'spawn', 'respawn',
  'noob', 'gg', 'ggez', 'loot', 'drop', 'zone', 'squad', 'loadout',
  'speedrun', 'raidz', 'dungeon', 'quest', 'boss', 'npc', 'xp', 'lvl',
];

const CHAOTIC_SIGNALS = [
  'chaos', 'chaotic', 'goblin', 'gremlin', 'rat', 'cryptid', 'void',
  'gremlin', 'feral', 'frog', 'clown', 'unhinged', 'delusional',
  'brain', 'rot', 'brainrot', 'deranged', 'unwell', 'broken', 'glitch',
];

// ─────────────────────────────────────────────────────────────
//  Avatar URL builders
// ─────────────────────────────────────────────────────────────

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Realistic photo portraits from randomuser.me
const realisticFemale  = (seed) => `https://randomuser.me/api/portraits/women/${seed % 99 + 1}.jpg`;
const realisticMale    = (seed) => `https://randomuser.me/api/portraits/men/${seed % 99 + 1}.jpg`;

// DiceBear styles
const dicebear = (style, seed) =>
  `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

// Avatar pools per vibe
function getAvatarUrl(username, vibeScore) {
  // vibeScore: negative = masculine, positive = feminine, 0 = neutral
  // Combine username as seed for DiceBear (deterministic per user)
  const seed = username;

  // Hash username to an integer for randomuser.me ID
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = (hash * 31 + username.charCodeAt(i)) & 0xffffffff;
  }
  const photoId = Math.abs(hash) % 99 + 1;

  // Determine vibe category
  if (vibeScore >= 3) {
    // Clearly feminine — mix realistic photos + cute DiceBear styles
    const opts = [
      () => realisticFemale(photoId),
      () => realisticFemale((photoId + 30) % 99 + 1),
      () => dicebear('lorelei', seed),          // cute anime feminine
      () => dicebear('notionists', seed),        // soft aesthetic
      () => dicebear('adventurer-neutral', seed), // adventurous but soft
    ];
    return opts[Math.abs(hash) % opts.length]();

  } else if (vibeScore <= -3) {
    // Clearly masculine — mix realistic photos + techy/bold DiceBear styles
    const opts = [
      () => realisticMale(photoId),
      () => realisticMale((photoId + 40) % 99 + 1),
      () => dicebear('bottts', seed),           // robot / tech
      () => dicebear('adventurer', seed),        // adventurous
      () => dicebear('pixel-art', seed),         // retro/gamer
    ];
    return opts[Math.abs(hash) % opts.length]();

  } else {
    // Neutral / vibe / aesthetic — mix everything
    const opts = [
      () => realisticFemale(photoId),
      () => realisticMale(photoId),
      () => dicebear('notionists', seed),
      () => dicebear('lorelei', seed),
      () => dicebear('pixel-art', seed),
      () => dicebear('fun-emoji', seed),
      () => dicebear('thumbs', seed),
      () => dicebear('adventurer', seed),
    ];
    return opts[Math.abs(hash) % opts.length]();
  }
}

// ─────────────────────────────────────────────────────────────
//  Username classifier
// ─────────────────────────────────────────────────────────────

function classifyUsername(username) {
  const lower = username.toLowerCase();
  let score = 0; // positive = feminine, negative = masculine

  for (const signal of FEMININE_SIGNALS) {
    if (lower.includes(signal)) score += 2;
  }
  for (const signal of MASCULINE_SIGNALS) {
    if (lower.includes(signal)) score -= 2;
  }
  // Tech/gamer slightly masculine coded
  for (const signal of TECH_SIGNALS) {
    if (lower.includes(signal)) score -= 1;
  }
  for (const signal of GAMER_SIGNALS) {
    if (lower.includes(signal)) score -= 1;
  }
  // Chaotic is neutral
  for (const signal of CHAOTIC_SIGNALS) {
    if (lower.includes(signal)) score += 0;
  }

  return score;
}

// ─────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function fetchAllUsers() {
  const users = [];
  const pageSize = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username')
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;
    data.forEach(u => users.push(u));
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return users;
}

// ─────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🖼️   Update Avatars\n');

  console.log('📥  Fetching all users...');
  const allUsers = await fetchAllUsers();
  const toUpdate = allUsers.filter(u => !PROTECTED.has(u.username));

  console.log(`   Total users    : ${allUsers.length}`);
  console.log(`   Protected       : ${allUsers.length - toUpdate.length}`);
  console.log(`   To update       : ${toUpdate.length}\n`);

  // Show classification breakdown
  let feminine = 0, masculine = 0, neutral = 0;
  const updates = toUpdate.map(u => {
    const score = classifyUsername(u.username);
    if (score >= 3) feminine++;
    else if (score <= -3) masculine++;
    else neutral++;
    return { id: u.id, avatar_url: getAvatarUrl(u.username, score), score };
  });

  console.log(`   Feminine vibes  : ${feminine}`);
  console.log(`   Masculine vibes : ${masculine}`);
  console.log(`   Neutral/mixed   : ${neutral}\n`);

  // Sample preview
  console.log('📋  Sample assignments:');
  updates.slice(0, 8).forEach((u, i) => {
    const vibe = u.score >= 3 ? '👧' : u.score <= -3 ? '👦' : '🔀';
    console.log(`   ${vibe} score:${String(u.score).padStart(3)}  ${u.avatar_url.substring(0, 70)}...`);
  });
  console.log('');

  // Push to DB
  console.log('🔄  Updating avatars in database...');
  let success = 0;
  let failed  = 0;

  for (const batch of chunk(updates, 100)) {
    await Promise.all(batch.map(async ({ id, avatar_url }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url })
        .eq('id', id);
      if (error) failed++;
      else success++;
    }));

    process.stdout.write(`\r   Progress: ${success + failed}/${toUpdate.length}`);
  }

  console.log('\n\n✅  Done!\n');
  console.log('────────────────────────────────');
  console.log(`  Updated  : ${success}`);
  console.log(`  Failed   : ${failed}`);
  console.log(`  Skipped  : ${allUsers.length - toUpdate.length} (protected)`);
  console.log('────────────────────────────────\n');
}

main().catch(err => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
