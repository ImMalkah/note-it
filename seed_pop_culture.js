const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const firstNames = ['Chloe', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Logan', 'Mia', 'Benjamin', 'Charlotte', 'Mason', 'Amelia', 'Elijah', 'Harper', 'Oliver', 'Evelyn', 'Jacob', 'Abigail', 'Lucas', 'Emily', 'Michael', 'Elizabeth', 'Alexander', 'Mila', 'Ethan', 'Ella', 'Daniel', 'Avery', 'Matthew', 'Sofia', 'Aiden', 'Camila', 'Henry', 'Aria', 'Joseph', 'Scarlett', 'Jackson', 'Victoria', 'Samuel', 'Madison', 'Sebastian', 'Luna', 'David', 'Grace', 'Carter', 'Wyatt', 'Penelope', 'Jayden', 'Layla', 'John', 'Riley', 'Owen', 'Zoey', 'Dylan', 'Nora', 'Luke', 'Lily', 'Gabriel', 'Eleanor', 'Anthony', 'Hannah', 'Isaac', 'Lillian', 'Grayson', 'Addison', 'Jack', 'Aubrey', 'Julian', 'Ellie', 'Levi', 'Stella', 'Christopher', 'Natalie', 'Joshua', 'Zoe', 'Andrew', 'Leah', 'Lincoln', 'Hazel', 'Mateo', 'Violet', 'Ryan', 'Aurora', 'Jaxon', 'Savannah', 'Nathan', 'Audrey', 'Aaron', 'Brooklyn', 'Isaiah', 'Bella', 'Thomas', 'Claire', 'Charles', 'Skylar'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'];

const personas = [
  {
    bio: "Still not over the Eras Tour 🪩 | Folkmore apologist",
    notes: ["I think I need to watch the Eras Tour movie for the 5th time this week.", "Reputation Taylor's Version is coming, I can feel it in my bones.", "Why does 'All Too Well' still hurt so much after all these years?"]
  },
  {
    bio: "Building the next big AI wrapper 🚀 | ex-FAANG",
    notes: ["Just bought another domain name for a project I'll never finish.", "GPT-5 is going to make all our jobs obsolete anyway.", "Does anyone else miss the old internet? The vibes are just off now."]
  },
  {
    bio: "Dune 2 is cinematic perfection 🎬 | Letterboxd user",
    notes: ["Denis Villeneuve can do no wrong. I will defend him with my life.", "I just watched a 4-hour video essay on YouTube about a movie I haven't even seen.", "My Letterboxd top 4 says everything you need to know about my mental health."]
  },
  {
    bio: "We go Jim 🏋️‍♂️ | 225 bench | Bulk szn",
    notes: ["Forgot my pre-workout today, pray for me.", "If you don't track your macros, are you even trying?", "The pump was absolutely unreal today."]
  },
  {
    bio: "Army 💜 | Stray Kids everywhere all around the world",
    notes: ["Did you see their new comeback concept photos?? I'm screaming.", "My bank account is crying because of all these album versions.", "Trying to learn the new choreo but I have two left feet."]
  },
  {
    bio: "GRWM / Day in the life ✨ | Link in bio",
    notes: ["The TikTok algorithm is so broken today, I'm getting 0 views.", "Honestly, the Charlotte Tilbury flawless filter is worth the hype.", "Romanticizing my life by romanticizing my $8 iced coffee."]
  },
  {
    bio: "HODL 🚀 | Web3 is the future",
    notes: ["Buying the dip because I hate money apparently.", "If Bitcoin hits 100k I'm buying a terrible island.", "I refuse to sell, diamond hands baby."]
  },
  {
    bio: "Love Island is my personality 📺 | Don't text",
    notes: ["I can't believe the drama on the latest season of The Traitors.", "Reality TV is the only thing keeping me sane rn.", "If they don't bring back the old cast, I'm rioting."]
  },
  {
    bio: "Phoebe Bridgers and indie movies 🎥",
    notes: ["Past Lives absolutely destroyed me. I'm still recovering.", "Is it possible to listen to Boygenius too much? Asking for a friend.", "A24 merch is the only thing I spend my money on."]
  },
  {
    bio: "Rating every matcha in the city 🍵",
    notes: ["I just found the best hidden gem cafe. No, I will not drop the location.", "Oat milk matcha latte is a personality trait.", "Why is eating out so expensive now? $25 for a salad is criminal."]
  },
  {
    bio: "Grinding rank 🎮 | Elden Ring DLC consumed me",
    notes: ["I've died to this boss 50 times. I love this game.", "My sleep schedule is completely ruined. One more game.", "Valorant matchmaking is a social experiment."]
  },
  {
    bio: "Sarah J. Maas enthusiast 📚 | BookTok",
    notes: ["I just bought 5 more books I won't read because the covers are pretty.", "The enemies to lovers slow burn in this series is unmatched.", "ACOTAR literally changed my brain chemistry."]
  },
  {
    bio: "Archive fashion enthusiast 👟 | Rick Owens",
    notes: ["Taking an L on the SNKRS app again. A tale as old as time.", "My cart is full but my bank account says no.", "Why is everyone dressing exactly the same right now?"]
  },
  {
    bio: "Charles Leclerc apologist 🏎️ | F1 fan",
    notes: ["Being a Ferrari fan is purely pain at this point.", "Lights out and away we go! My heart rate is 150bpm.", "Is it Sunday yet? I need to see cars going in circles."]
  },
  {
    bio: "Chronically online 📱 | Meme historian",
    notes: ["I have a meme for every possible situation.", "My screen time is honestly embarrassing.", "I spoke in full internet slang today and my mom looked terrified."]
  }
];

async function seed() {
  console.log('Starting seed...');
  let userIds = [];
  let noteIds = [];

  for (let i = 1; i <= 100; i++) {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const picId = Math.floor(Math.random() * 99) + 1;
    const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${picId}.jpg`;
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 9999)}`;
    const email = `${username}_pop_${i}@example.com`;
    
    const persona = personas[Math.floor(Math.random() * personas.length)];
    
    // Create Auth User
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: 'password123',
      email_confirm: true,
      user_metadata: { username }
    });
    
    if (authError) {
      console.error('Error creating user:', authError);
      continue;
    }
    
    const userId = authData.user.id;
    userIds.push(userId);
    
    // Wait for the trigger to insert into public.profiles
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        bio: persona.bio,
        avatar_url: avatarUrl,
        mood: ['happy', 'thoughtful', 'excited', 'chill', 'focused', 'creative', 'tired'][Math.floor(Math.random() * 7)]
      })
      .eq('id', userId);
      
    if (profileError) console.error('Error updating profile:', profileError);

    // Create Notes
    const numNotes = Math.floor(Math.random() * 3) + 2; // 2 to 4 notes
    let notesToInsert = [];
    for (let j = 0; j < numNotes; j++) {
      const noteContent = persona.notes[Math.floor(Math.random() * persona.notes.length)];
      const noteTitle = noteContent.split(' ').slice(0, 4).join(' ') + '...';
      notesToInsert.push({
        title: noteTitle,
        content: noteContent,
        author_id: userId
      });
    }
    
    const { data: notesData, error: notesError } = await supabase
      .from('notes')
      .insert(notesToInsert)
      .select('id');
      
    if (notesError) console.error('Error inserting notes:', notesError);
    if (notesData) {
      noteIds.push(...notesData.map(n => n.id));
    }
    
    process.stdout.write(`\rCreated user ${i}/100`);
  }
  
  console.log('\nGenerating Follows, Likes, and Saves...');
  
  // Follows
  let followsToInsert = [];
  for (let i = 0; i < userIds.length; i++) {
    const numFollows = Math.floor(Math.random() * 10) + 5; // 5 to 14 follows
    const shuffled = [...userIds].sort(() => 0.5 - Math.random());
    const toFollow = shuffled.slice(0, numFollows).filter(id => id !== userIds[i]);
    toFollow.forEach(followingId => {
      followsToInsert.push({ follower_id: userIds[i], following_id: followingId });
    });
  }
  
  // Break into chunks of 1000 to avoid limits
  const chunkSize = 1000;
  for (let i = 0; i < followsToInsert.length; i += chunkSize) {
    const chunk = followsToInsert.slice(i, i + chunkSize);
    await supabase.from('user_follows').insert(chunk).select('follower_id'); // Ignore duplicate errors if they exist via constraint, wait, insert might fail the whole batch if duplicate. We'll use upsert.
  }
  
  // Actually, standard insert might fail if there's a unique constraint and duplicate generated. We should upsert.
  for (let i = 0; i < followsToInsert.length; i += chunkSize) {
    const chunk = followsToInsert.slice(i, i + chunkSize);
    await supabase.from('user_follows').upsert(chunk, { onConflict: 'follower_id,following_id', ignoreDuplicates: true });
  }

  // Likes
  let likesToInsert = [];
  for (let i = 0; i < userIds.length; i++) {
    const numLikes = Math.floor(Math.random() * 15) + 10;
    const shuffledNotes = [...noteIds].sort(() => 0.5 - Math.random());
    const toLike = shuffledNotes.slice(0, numLikes);
    toLike.forEach(noteId => {
      likesToInsert.push({ user_id: userIds[i], note_id: noteId });
    });
  }
  for (let i = 0; i < likesToInsert.length; i += chunkSize) {
    const chunk = likesToInsert.slice(i, i + chunkSize);
    await supabase.from('note_likes').upsert(chunk, { onConflict: 'user_id,note_id', ignoreDuplicates: true });
  }
  
  // Saves
  let savesToInsert = [];
  for (let i = 0; i < userIds.length; i++) {
    const numSaves = Math.floor(Math.random() * 10) + 5;
    const shuffledNotes = [...noteIds].sort(() => 0.5 - Math.random());
    const toSave = shuffledNotes.slice(0, numSaves);
    toSave.forEach(noteId => {
      savesToInsert.push({ user_id: userIds[i], note_id: noteId });
    });
  }
  for (let i = 0; i < savesToInsert.length; i += chunkSize) {
    const chunk = savesToInsert.slice(i, i + chunkSize);
    await supabase.from('saved_notes').upsert(chunk, { onConflict: 'user_id,note_id', ignoreDuplicates: true });
  }
  
  console.log('\nSeed completed successfully!');
}

seed().catch(console.error);
