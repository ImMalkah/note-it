/**
 * ============================================================
 *  BOOST INTERACTIONS
 *  Generates follows, likes, and saves between ALL existing
 *  users and notes already in the database.
 *
 *  RUN:
 *    node scripts/boost-interactions.js
 *
 *  Tweak the numbers at the top to control volume.
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
//  CONFIG — tweak these
// ─────────────────────────────────────────────────────────────
const FOLLOW_ATTEMPTS = 60_000;
const LIKE_ATTEMPTS   = 200_000;
const SAVE_ATTEMPTS   = 80_000;
const BATCH_SIZE      = 1_000; // rows per upsert
// ─────────────────────────────────────────────────────────────

const pick  = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function fetchAllIds(table, column) {
  console.log(`   Fetching ${table}...`);
  const ids = [];
  const pageSize = 1_000;
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(column)
      .range(from, from + pageSize - 1);

    if (error) throw new Error(`Failed fetching ${table}: ${error.message}`);
    if (!data || data.length === 0) break;

    data.forEach((row) => ids.push(row[column]));
    if (data.length < pageSize) break;
    from += pageSize;
  }

  return ids;
}

async function main() {
  console.log('\n⚡  Boost Interactions\n');

  // ── Fetch existing data ──────────────────────────────────
  console.log('📥  Loading existing users and notes from database...');
  const userIds = await fetchAllIds('profiles', 'id');
  const noteIds = await fetchAllIds('notes', 'id');

  console.log(`   Users : ${userIds.length.toLocaleString()}`);
  console.log(`   Notes : ${noteIds.length.toLocaleString()}`);

  if (userIds.length < 2 || noteIds.length === 0) {
    console.error('❌  Not enough data in DB. Run the seed first.');
    return;
  }

  console.log('');

  // ── Follows ───────────────────────────────────────────────
  console.log(`👥  Generating ${FOLLOW_ATTEMPTS.toLocaleString()} follow attempts...`);
  const followPairs = new Set();
  const followRows  = [];

  for (let i = 0; i < FOLLOW_ATTEMPTS; i++) {
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

  let followInserted = 0;
  for (const batch of chunk(followRows, BATCH_SIZE)) {
    const { error } = await supabase
      .from('user_follows')
      .upsert(batch, { onConflict: 'follower_id,following_id', ignoreDuplicates: true });
    if (!error) followInserted += batch.length;
  }
  console.log(`✅  Follows inserted: ${followInserted.toLocaleString()}\n`);

  // ── Likes ─────────────────────────────────────────────────
  console.log(`❤️   Generating ${LIKE_ATTEMPTS.toLocaleString()} like attempts...`);
  const likePairs = new Set();
  const likeRows  = [];

  for (let i = 0; i < LIKE_ATTEMPTS; i++) {
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

  let likeInserted = 0;
  for (const batch of chunk(likeRows, BATCH_SIZE)) {
    const { error } = await supabase
      .from('note_likes')
      .upsert(batch, { onConflict: 'user_id,note_id', ignoreDuplicates: true });
    if (!error) likeInserted += batch.length;
  }
  console.log(`✅  Likes inserted: ${likeInserted.toLocaleString()}\n`);

  // ── Saves ─────────────────────────────────────────────────
  console.log(`🔖  Generating ${SAVE_ATTEMPTS.toLocaleString()} save attempts...`);
  const savePairs = new Set();
  const saveRows  = [];

  for (let i = 0; i < SAVE_ATTEMPTS; i++) {
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

  let saveInserted = 0;
  for (const batch of chunk(saveRows, BATCH_SIZE)) {
    const { error } = await supabase
      .from('saved_notes')
      .upsert(batch, { onConflict: 'user_id,note_id', ignoreDuplicates: true });
    if (!error) saveInserted += batch.length;
  }
  console.log(`✅  Saves inserted: ${saveInserted.toLocaleString()}\n`);

  // ── Summary ───────────────────────────────────────────────
  console.log('🎉  Done!\n');
  console.log('────────────────────────────────');
  console.log(`  Follows : +${followInserted.toLocaleString()}`);
  console.log(`  Likes   : +${likeInserted.toLocaleString()}`);
  console.log(`  Saves   : +${saveInserted.toLocaleString()}`);
  console.log('────────────────────────────────\n');
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
