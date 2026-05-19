/**
 * ============================================================
 *  RENAME USERNAMES
 *  Assigns modern, realistic social-media-style usernames
 *  to all seeded users. Skips protected accounts.
 *
 *  RUN:
 *    node scripts/rename-users.js
 * ============================================================
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ─────────────────────────────────────────────────────────────
//  Accounts to never touch
// ─────────────────────────────────────────────────────────────
const PROTECTED = new Set(['fastifan', 'lexylexy', 'malkah']);

// ─────────────────────────────────────────────────────────────
//  Modern username pool
//  Patterns seen on Instagram, Twitter/X, TikTok, Tumblr
// ─────────────────────────────────────────────────────────────

const prefixes = [
  // its / im / hey / not
  'its', 'im', 'hey', 'not', 'just', 'only', 'real', 'actual',
  // vibe words
  'soft', 'quiet', 'dark', 'late', 'slow', 'cold', 'empty', 'deep',
  'lost', 'odd', 'raw', 'still', 'blur', 'numb', 'void', 'bare',
  // aesthetic
  'gloom', 'haze', 'dusk', 'dawn', 'ash', 'fog', 'mist', 'grey',
  'noir', 'lunar', 'solar', 'cosmic', 'retro', 'vapor', 'pixel',
  // culture
  'main', 'local', 'daily', 'night', 'mid', 'post', 'pre', 'hyper',
  'ultra', 'mega', 'super', 'neo', 'anti', 'extra', 'low', 'high',
  // slang
  'sleepy', 'moody', 'lazy', 'dizzy', 'lucky', 'salty', 'spicy',
  'icy', 'cozy', 'clumsy', 'gloomy', 'fancy', 'shady', 'dusty',
];

const names = [
  'kai', 'nova', 'mia', 'leo', 'zoe', 'eli', 'luna', 'ash',
  'remi', 'jay', 'noa', 'sam', 'ava', 'rio', 'sky', 'max',
  'ivy', 'ren', 'fin', 'bex', 'ada', 'cas', 'dex', 'rue',
  'felix', 'maya', 'omar', 'nina', 'luca', 'vera', 'juno', 'ezra',
  'lyra', 'reed', 'sage', 'wren', 'cleo', 'theo', 'iris', 'blake',
  'drew', 'tate', 'beau', 'lake', 'gray', 'faye', 'jade', 'cole',
  'nico', 'mara', 'zara', 'ezra', 'soren', 'petra', 'caden', 'kira',
  'nadia', 'priya', 'layla', 'miles', 'quinn', 'river', 'piper', 'eden',
];

const suffixes = [
  // platform-native
  'irl', 'online', 'real', 'live', 'actual', 'archive', 'posting',
  'daily', 'feed', 'notes', 'log', 'diary', 'thoughts', 'takes',
  'hq', 'tv', 'fm', 'wav', 'mp3', 'jpeg', 'gif', 'png',
  // vibe endings
  'core', 'era', 'mode', 'energy', 'coded', 'hours', 'szn', 'world',
  'gang', 'club', 'crew', 'space', 'zone', 'place', 'page', 'dot',
  // status words
  'verified', 'unverified', 'private', 'public', 'main', 'alt', 'spam',
  'backup', 'v2', 'v3', 'again', 'returns', 'reborn', 'idk', 'etc',
  // slang
  'fr', 'ngl', 'lol', 'omg', 'bruh', 'lowkey', 'tbh', 'rly',
  'okk', 'omfg', 'sigh', 'ugh', 'yikes', 'oof', 'meh', 'zzz',
];

// Standalone complete usernames — the most realistic option
const standalones = [
  // emotion/vibe
  'notmyfinest', 'quietkidvibes', 'softchaosonly', 'eternallytired',
  'sadgirlhours', 'brokeandpoetic', 'yungphilosopher', 'cloudwatcherr',
  'doomscrollingagain', 'existentialish', 'lowbatterymode', 'midnightthoughts',
  'overthinkingirl', 'alwaysonline99', 'slowburnperson', 'quietlycrumbling',
  'notokaybutfine', 'blurryfaceed', 'warmbutchaotic', 'slightlyoffline',
  'vaguely_emotional', 'perpetually_tired', 'semidetached', 'barely_functional',
  'softlydrifting', 'hauntedbyvibes', 'delicatelydamaged', 'peaceably_lost',

  // aesthetic/style
  'vintagemindset', 'grainyfilm35mm', 'liminalspacecore', 'retrofuturist',
  'vaporwavevibes', 'lofihoursonly', 'analoguesoul', 'darkacademiairl',
  'cottagecoremood', 'goblinmodereal', 'angelicnoisemaker', 'cinematicmoments',
  'archiveofself', 'dustyarchives', 'polaroidmemory', ' filmgrainperson',
  'silentfilmcore', 'neonnoirvibes', 'pastelchaosonly', 'glitchartgirl',
  'voidcore_daily', 'shoegaze_hours', 'midwesternemo', 'sadindiecore',

  // personality/behavior
  'localoverthinkr', 'professionallurker', 'serialreplier',
  'avoidantattachmentt', 'maincharacterish', 'textingbacklater',
  'chaoticgoodenergy', 'lawfulneutralvibes', 'replyingdayslatr',
  'readreceiptsoff', 'leftoncurveball', 'ghostedbutstill here',
  'finallyreplying', 'chronicallyonlne', 'dopaminedefiicit',
  'ruminatingagain', 'intrusive_thoughts', 'catastrophizng',
  'peoplepleaser404', 'conflict_avoider', 'anxiousattachedd',
  'hypervigilantgirl', 'dissociatingrn', 'groundingmyself',

  // humor/internet
  'ratgirlsummer', 'goblinlifestyle', 'cryptidbehavior', 'frogpilled',
  'delulusionment', 'girlbossgrindset', 'burnoutbehavior', 'grindset_off',
  'npcbehavioronly', 'sidequestlife', 'spawningpointearth', 'tutorial_failed',
  'respawn_incoming', 'loadingscreen_rn', 'skipping_cutscenes', 'afkirl',
  'ggnorematch', 'rageQuitReal', 'onemorround', 'nerfedirl',

  // culture/interests
  'bookishchaos', 'readinginthedark', 'literallyreadng', 'pagebrokenheart',
  'indiefilmcrying', 'a24survivor', 'letterboxdloser', 'cinematherapy',
  'spotifybreakdown', 'albumoftheyear_', 'vinylhead35', 'basslineaddict',
  'concertcrying', 'setlistmemory', 'b_sidecollector', 'deepcutsonlypls',
  'sportedfan999', 'refereeblind', 'lastminute_goal', 'fanzonerookie',

  // life
  'rentdue_again', 'gradedebt_era', 'careerpivoter', 'quietquitting_rn',
  'freelancechaos', 'wfhpurgatory', 'emailzeroquest', 'meetingcouldvemail',
  'linearworkflow', 'standup_dread', '9to5survivor', 'corporatecasual',
  'justinternthings', 'seniordevcrisis', 'juniordevpanic', 'hackathonregret',
  'coffeebeforepeople', 'decafwhenforced', 'espressorunning', 'matcha_convert',
];

// ─────────────────────────────────────────────────────────────
//  Username generator
// ─────────────────────────────────────────────────────────────
function generatePool(count) {
  const pool = new Set();

  // Add all standalones first
  standalones.forEach(u => pool.add(u.replace(/\s/g, '').toLowerCase()));

  const strategies = [
    // prefix + name
    () => `${pick(prefixes)}${pick(names)}`,
    // name + suffix
    () => `${pick(names)}${pick(suffixes)}`,
    // prefix + name + suffix
    () => `${pick(prefixes)}${pick(names)}${pick(suffixes)}`,
    // name + 2-digit number (not 4-digit robot number)
    () => `${pick(names)}${rand(10, 99)}`,
    // prefix + name + 2-digit number
    () => `${pick(prefixes)}${pick(names)}${rand(10, 99)}`,
    // standalone (repeated picks)
    () => standalones[rand(0, standalones.length - 1)].replace(/\s/g, '').toLowerCase(),
  ];

  let attempts = 0;
  while (pool.size < count && attempts < count * 10) {
    const fn = strategies[rand(0, strategies.length - 1)];
    const username = fn().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (username.length >= 3 && username.length <= 30) {
      pool.add(username);
    }
    attempts++;
  }

  return Array.from(pool);
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

    if (error) throw new Error(`Failed fetching profiles: ${error.message}`);
    if (!data || data.length === 0) break;
    data.forEach(u => users.push(u));
    if (data.length < pageSize) break;
    from += pageSize;
  }

  return users;
}

async function main() {
  console.log('\n✏️   Rename Users\n');

  // Fetch all users
  console.log('📥  Fetching all users...');
  const allUsers = await fetchAllUsers();

  // Filter out protected accounts
  const toRename = allUsers.filter(u => !PROTECTED.has(u.username));
  console.log(`   Total users    : ${allUsers.length}`);
  console.log(`   Protected       : ${allUsers.length - toRename.length} (${[...PROTECTED].join(', ')})`);
  console.log(`   To rename       : ${toRename.length}\n`);

  if (toRename.length === 0) {
    console.log('Nothing to rename.');
    return;
  }

  // Generate enough unique usernames
  console.log('🎲  Generating username pool...');
  const pool = generatePool(toRename.length * 3); // 3x buffer for uniqueness
  console.log(`   Pool size       : ${pool.length}`);

  if (pool.length < toRename.length) {
    console.error(`❌  Not enough unique usernames generated (${pool.length} < ${toRename.length}). Add more entries.`);
    process.exit(1);
  }

  // Shuffle pool and assign
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const assignments = toRename.map((user, i) => ({
    id: user.id,
    oldUsername: user.username,
    newUsername: shuffled[i],
  }));

  // Rename in DB — profiles table only
  // (auth.users email/metadata is internal-only and doesn't affect display)
  console.log('🔄  Renaming users...\n');

  let success = 0;
  let failed  = 0;

  for (const batch of chunk(assignments, 50)) {
    await Promise.all(batch.map(async ({ id, newUsername }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', id);

      if (error) {
        // Likely a duplicate — generate a fallback with a suffix
        const fallback = `${newUsername}${rand(10, 99)}`;
        const { error: err2 } = await supabase
          .from('profiles')
          .update({ username: fallback })
          .eq('id', id);

        if (err2) failed++;
        else success++;
      } else {
        success++;
      }
    }));
  }

  console.log('✅  Done!\n');
  console.log('────────────────────────────────');
  console.log(`  Renamed  : ${success}`);
  console.log(`  Failed   : ${failed}`);
  console.log(`  Skipped  : ${allUsers.length - toRename.length} (protected)`);
  console.log('────────────────────────────────\n');

  // Show a sample
  console.log('📋  Sample of new usernames:');
  assignments.slice(0, 20).forEach(a => {
    console.log(`   ${a.oldUsername.padEnd(30)} → ${a.newUsername}`);
  });
  console.log('');
}

main().catch(err => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
