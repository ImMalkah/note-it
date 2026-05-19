const fs = require('fs');

const firstNames = ['Chloe', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Logan', 'Mia', 'Benjamin', 'Charlotte', 'Mason', 'Amelia', 'Elijah', 'Harper', 'Oliver', 'Evelyn', 'Jacob', 'Abigail', 'Lucas', 'Emily', 'Michael', 'Elizabeth', 'Alexander', 'Mila', 'Ethan', 'Ella', 'Daniel', 'Avery', 'Matthew', 'Sofia', 'Aiden', 'Camila', 'Henry', 'Aria', 'Joseph', 'Scarlett', 'Jackson', 'Victoria', 'Samuel', 'Madison', 'Sebastian', 'Luna', 'David', 'Grace', 'Carter', 'Chloe', 'Wyatt', 'Penelope', 'Jayden', 'Layla', 'John', 'Riley', 'Owen', 'Zoey', 'Dylan', 'Nora', 'Luke', 'Lily', 'Gabriel', 'Eleanor', 'Anthony', 'Hannah', 'Isaac', 'Lillian', 'Grayson', 'Addison', 'Jack', 'Aubrey', 'Julian', 'Ellie', 'Levi', 'Stella', 'Christopher', 'Natalie', 'Joshua', 'Zoe', 'Andrew', 'Leah', 'Lincoln', 'Hazel', 'Mateo', 'Violet', 'Ryan', 'Aurora', 'Jaxon', 'Savannah', 'Nathan', 'Audrey', 'Aaron', 'Brooklyn', 'Isaiah', 'Bella', 'Thomas', 'Claire', 'Charles', 'Skylar'];
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

let sql = `
DO $$
DECLARE
    new_user_id uuid;
    user_ids uuid[] := '{}';
    new_note_id bigint;
    note_ids bigint[] := '{}';
    random_user uuid;
    random_note bigint;
BEGIN
`;

// Insert 100 users
for (let i = 1; i <= 100; i++) {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const picId = Math.floor(Math.random() * 99) + 1;
  const avatarUrl = `https://randomuser.me/api/portraits/${gender}/${picId}.jpg`;
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}`;
  const email = `${username}_${i}@example.com`;
  
  const persona = personas[Math.floor(Math.random() * personas.length)];
  
  sql += `
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        '${email}',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', '${username}'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = '${persona.bio.replace(/'/g, "''")}',
        avatar_url = '${avatarUrl}'
    WHERE id = new_user_id;
  `;

  // Each user gets 2 to 4 notes based on their persona
  const numNotes = Math.floor(Math.random() * 3) + 2;
  for (let j = 0; j < numNotes; j++) {
    const noteContent = persona.notes[Math.floor(Math.random() * persona.notes.length)];
    const noteTitle = noteContent.split(' ').slice(0, 4).join(' ') + '...'; // First 4 words as title
    
    sql += `
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        '${noteTitle.replace(/'/g, "''")}',
        '${noteContent.replace(/'/g, "''")}',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    `;
  }
}

// Generate Follows (Each follows 10-25 users)
sql += `
    FOR i IN 1..100 LOOP
        FOR j IN 1..(10 + floor(random() * 16)::int) LOOP
            random_user := user_ids[1 + floor(random() * 100)::int];
            IF random_user != user_ids[i] THEN
                BEGIN
                    INSERT INTO public.user_follows (follower_id, following_id, created_at)
                    VALUES (user_ids[i], random_user, now() - (random() * interval '30 days'));
                EXCEPTION WHEN unique_violation THEN
                END;
            END IF;
        END LOOP;
    END LOOP;
`;

// Generate Likes and Saves (Each likes 15-40 notes, saves 5-15)
sql += `
    FOR i IN 1..100 LOOP
        FOR j IN 1..(15 + floor(random() * 26)::int) LOOP
            random_note := note_ids[1 + floor(random() * array_length(note_ids, 1))::int];
            BEGIN
                INSERT INTO public.note_likes (user_id, note_id, created_at)
                VALUES (user_ids[i], random_note, now() - (random() * interval '30 days'));
            EXCEPTION WHEN unique_violation THEN
            END;
        END LOOP;

        FOR j IN 1..(5 + floor(random() * 11)::int) LOOP
            random_note := note_ids[1 + floor(random() * array_length(note_ids, 1))::int];
            BEGIN
                INSERT INTO public.saved_notes (user_id, note_id, created_at)
                VALUES (user_ids[i], random_note, now() - (random() * interval '30 days'));
            EXCEPTION WHEN unique_violation THEN
            END;
        END LOOP;
    END LOOP;
END $$;
`;

fs.writeFileSync('seed_pop_culture.sql', sql);
console.log('SQL generated successfully.');
