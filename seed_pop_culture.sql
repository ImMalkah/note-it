
DO $$
DECLARE
    new_user_id uuid;
    user_ids uuid[] := '{}';
    new_note_id bigint;
    note_ids bigint[] := '{}';
    random_user uuid;
    random_note bigint;
BEGIN

    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jackson_watson891_1@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jackson_watson891'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/women/36.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If they don''t bring...',
        'If they don''t bring back the old cast, I''m rioting.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'wyatt_cooper540_2@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'wyatt_cooper540'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/men/33.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'wyatt_lewis645_3@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'wyatt_lewis645'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/men/14.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'james_walker591_4@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'james_walker591'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/women/97.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'julian_chavez523_5@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'julian_chavez523'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/women/19.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'charles_bennett416_6@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'charles_bennett416'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/women/12.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'gabriel_gray312_7@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'gabriel_gray312'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/men/2.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'aiden_kim491_8@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'aiden_kim491'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/men/91.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'james_gonzalez299_9@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'james_gonzalez299'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/women/89.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'grayson_gray374_10@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'grayson_gray374'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'GRWM / Day in the life ✨ | Link in bio',
        avatar_url = 'https://randomuser.me/api/portraits/men/93.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'evelyn_morgan296_11@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'evelyn_morgan296'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Army 💜 | Stray Kids everywhere all around the world',
        avatar_url = 'https://randomuser.me/api/portraits/men/47.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My bank account is...',
        'My bank account is crying because of all these album versions.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jayden_roberts133_12@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jayden_roberts133'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Phoebe Bridgers and indie movies 🎥',
        avatar_url = 'https://randomuser.me/api/portraits/women/24.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'ava_morris435_13@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'ava_morris435'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/men/70.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jayden_carter434_14@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jayden_carter434'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'We go Jim 🏋️‍♂️ | 225 bench | Bulk szn',
        avatar_url = 'https://randomuser.me/api/portraits/men/19.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Forgot my pre-workout today,...',
        'Forgot my pre-workout today, pray for me.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If you don''t track...',
        'If you don''t track your macros, are you even trying?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'isabella_ramirez331_15@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'isabella_ramirez331'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/women/63.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'nathan_hughes270_16@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'nathan_hughes270'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Building the next big AI wrapper 🚀 | ex-FAANG',
        avatar_url = 'https://randomuser.me/api/portraits/men/14.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'GPT-5 is going to...',
        'GPT-5 is going to make all our jobs obsolete anyway.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'GPT-5 is going to...',
        'GPT-5 is going to make all our jobs obsolete anyway.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'nathan_perez341_17@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'nathan_perez341'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/men/21.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'thomas_young611_18@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'thomas_young611'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/men/99.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'carter_howard562_19@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'carter_howard562'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Archive fashion enthusiast 👟 | Rick Owens',
        avatar_url = 'https://randomuser.me/api/portraits/women/72.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Taking an L on...',
        'Taking an L on the SNKRS app again. A tale as old as time.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My cart is full...',
        'My cart is full but my bank account says no.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Taking an L on...',
        'Taking an L on the SNKRS app again. A tale as old as time.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'wyatt_murphy366_20@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'wyatt_murphy366'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Army 💜 | Stray Kids everywhere all around the world',
        avatar_url = 'https://randomuser.me/api/portraits/men/23.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My bank account is...',
        'My bank account is crying because of all these album versions.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'james_rivera453_21@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'james_rivera453'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/men/83.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'grace_young62_22@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'grace_young62'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/85.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'liam_myers25_23@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'liam_myers25'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/men/38.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'chloe_taylor826_24@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'chloe_taylor826'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/women/22.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'addison_morris660_25@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'addison_morris660'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/55.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'lily_lee613_26@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'lily_lee613'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/women/36.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'bella_martinez118_27@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'bella_martinez118'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Still not over the Eras Tour 🪩 | Folkmore apologist',
        avatar_url = 'https://randomuser.me/api/portraits/men/71.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I think I need...',
        'I think I need to watch the Eras Tour movie for the 5th time this week.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why does ''All Too...',
        'Why does ''All Too Well'' still hurt so much after all these years?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reputation Taylor''s Version is...',
        'Reputation Taylor''s Version is coming, I can feel it in my bones.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'lillian_brooks569_28@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'lillian_brooks569'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/women/8.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'aiden_lee497_29@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'aiden_lee497'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Archive fashion enthusiast 👟 | Rick Owens',
        avatar_url = 'https://randomuser.me/api/portraits/men/29.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My cart is full...',
        'My cart is full but my bank account says no.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Taking an L on...',
        'Taking an L on the SNKRS app again. A tale as old as time.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is everyone dressing...',
        'Why is everyone dressing exactly the same right now?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Taking an L on...',
        'Taking an L on the SNKRS app again. A tale as old as time.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'ryan_rivera332_30@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'ryan_rivera332'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Building the next big AI wrapper 🚀 | ex-FAANG',
        avatar_url = 'https://randomuser.me/api/portraits/women/75.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'GPT-5 is going to...',
        'GPT-5 is going to make all our jobs obsolete anyway.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'addison_parker725_31@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'addison_parker725'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/78.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'joseph_ruiz860_32@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'joseph_ruiz860'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Archive fashion enthusiast 👟 | Rick Owens',
        avatar_url = 'https://randomuser.me/api/portraits/men/31.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My cart is full...',
        'My cart is full but my bank account says no.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is everyone dressing...',
        'Why is everyone dressing exactly the same right now?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Taking an L on...',
        'Taking an L on the SNKRS app again. A tale as old as time.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is everyone dressing...',
        'Why is everyone dressing exactly the same right now?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'isabella_harris660_33@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'isabella_harris660'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'GRWM / Day in the life ✨ | Link in bio',
        avatar_url = 'https://randomuser.me/api/portraits/women/80.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'daniel_edwards813_34@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'daniel_edwards813'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/women/50.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'eleanor_gutierrez519_35@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'eleanor_gutierrez519'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/98.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jackson_jimenez521_36@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jackson_jimenez521'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/women/44.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'evelyn_robinson935_37@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'evelyn_robinson935'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/men/1.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'audrey_cruz895_38@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'audrey_cruz895'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/women/30.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'brooklyn_rogers289_39@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'brooklyn_rogers289'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'We go Jim 🏋️‍♂️ | 225 bench | Bulk szn',
        avatar_url = 'https://randomuser.me/api/portraits/men/37.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If you don''t track...',
        'If you don''t track your macros, are you even trying?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Forgot my pre-workout today,...',
        'Forgot my pre-workout today, pray for me.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'ryan_turner769_40@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'ryan_turner769'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/women/73.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'samuel_stewart182_41@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'samuel_stewart182'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'We go Jim 🏋️‍♂️ | 225 bench | Bulk szn',
        avatar_url = 'https://randomuser.me/api/portraits/men/58.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Forgot my pre-workout today,...',
        'Forgot my pre-workout today, pray for me.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If you don''t track...',
        'If you don''t track your macros, are you even trying?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If you don''t track...',
        'If you don''t track your macros, are you even trying?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'daniel_young439_42@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'daniel_young439'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Still not over the Eras Tour 🪩 | Folkmore apologist',
        avatar_url = 'https://randomuser.me/api/portraits/women/77.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why does ''All Too...',
        'Why does ''All Too Well'' still hurt so much after all these years?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reputation Taylor''s Version is...',
        'Reputation Taylor''s Version is coming, I can feel it in my bones.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reputation Taylor''s Version is...',
        'Reputation Taylor''s Version is coming, I can feel it in my bones.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I think I need...',
        'I think I need to watch the Eras Tour movie for the 5th time this week.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'harper_cruz856_43@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'harper_cruz856'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/19.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'isabella_morales113_44@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'isabella_morales113'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Army 💜 | Stray Kids everywhere all around the world',
        avatar_url = 'https://randomuser.me/api/portraits/women/73.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Trying to learn the...',
        'Trying to learn the new choreo but I have two left feet.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'owen_rodriguez398_45@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'owen_rodriguez398'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Chronically online 📱 | Meme historian',
        avatar_url = 'https://randomuser.me/api/portraits/women/44.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My screen time is...',
        'My screen time is honestly embarrassing.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I have a meme...',
        'I have a meme for every possible situation.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My screen time is...',
        'My screen time is honestly embarrassing.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'james_jackson904_46@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'james_jackson904'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Still not over the Eras Tour 🪩 | Folkmore apologist',
        avatar_url = 'https://randomuser.me/api/portraits/women/8.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reputation Taylor''s Version is...',
        'Reputation Taylor''s Version is coming, I can feel it in my bones.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why does ''All Too...',
        'Why does ''All Too Well'' still hurt so much after all these years?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'claire_nguyen770_47@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'claire_nguyen770'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/men/27.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'samuel_sanders503_48@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'samuel_sanders503'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'GRWM / Day in the life ✨ | Link in bio',
        avatar_url = 'https://randomuser.me/api/portraits/men/23.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The TikTok algorithm is...',
        'The TikTok algorithm is so broken today, I''m getting 0 views.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'samuel_turner984_49@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'samuel_turner984'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/men/55.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If they don''t bring...',
        'If they don''t bring back the old cast, I''m rioting.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'mateo_james702_50@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'mateo_james702'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Phoebe Bridgers and indie movies 🎥',
        avatar_url = 'https://randomuser.me/api/portraits/women/36.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'A24 merch is the...',
        'A24 merch is the only thing I spend my money on.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'A24 merch is the...',
        'A24 merch is the only thing I spend my money on.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'bella_wood556_51@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'bella_wood556'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'HODL 🚀 | Web3 is the future',
        avatar_url = 'https://randomuser.me/api/portraits/women/90.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I refuse to sell,...',
        'I refuse to sell, diamond hands baby.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I refuse to sell,...',
        'I refuse to sell, diamond hands baby.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'avery_ross730_52@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'avery_ross730'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/men/28.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'isabella_torres4_53@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'isabella_torres4'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/women/88.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'emma_wright961_54@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'emma_wright961'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Still not over the Eras Tour 🪩 | Folkmore apologist',
        avatar_url = 'https://randomuser.me/api/portraits/women/94.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reputation Taylor''s Version is...',
        'Reputation Taylor''s Version is coming, I can feel it in my bones.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I think I need...',
        'I think I need to watch the Eras Tour movie for the 5th time this week.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I think I need...',
        'I think I need to watch the Eras Tour movie for the 5th time this week.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'julian_alvarez804_55@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'julian_alvarez804'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'HODL 🚀 | Web3 is the future',
        avatar_url = 'https://randomuser.me/api/portraits/men/99.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Buying the dip because...',
        'Buying the dip because I hate money apparently.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Buying the dip because...',
        'Buying the dip because I hate money apparently.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I refuse to sell,...',
        'I refuse to sell, diamond hands baby.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'audrey_ortiz601_56@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'audrey_ortiz601'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Chronically online 📱 | Meme historian',
        avatar_url = 'https://randomuser.me/api/portraits/men/39.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I have a meme...',
        'I have a meme for every possible situation.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My screen time is...',
        'My screen time is honestly embarrassing.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'daniel_price133_57@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'daniel_price133'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/men/16.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'gabriel_martinez815_58@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'gabriel_martinez815'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/women/53.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'sebastian_robinson440_59@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'sebastian_robinson440'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Army 💜 | Stray Kids everywhere all around the world',
        avatar_url = 'https://randomuser.me/api/portraits/women/7.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My bank account is...',
        'My bank account is crying because of all these album versions.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Trying to learn the...',
        'Trying to learn the new choreo but I have two left feet.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Trying to learn the...',
        'Trying to learn the new choreo but I have two left feet.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'emma_taylor592_60@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'emma_taylor592'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/women/23.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'mason_campbell319_61@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'mason_campbell319'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'We go Jim 🏋️‍♂️ | 225 bench | Bulk szn',
        avatar_url = 'https://randomuser.me/api/portraits/men/27.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Forgot my pre-workout today,...',
        'Forgot my pre-workout today, pray for me.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'savannah_wright602_62@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'savannah_wright602'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/women/28.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'wyatt_howard300_63@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'wyatt_howard300'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Phoebe Bridgers and indie movies 🎥',
        avatar_url = 'https://randomuser.me/api/portraits/men/1.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'A24 merch is the...',
        'A24 merch is the only thing I spend my money on.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it possible to...',
        'Is it possible to listen to Boygenius too much? Asking for a friend.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'james_martinez824_64@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'james_martinez824'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/men/31.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'chloe_howard644_65@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'chloe_howard644'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Archive fashion enthusiast 👟 | Rick Owens',
        avatar_url = 'https://randomuser.me/api/portraits/women/37.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is everyone dressing...',
        'Why is everyone dressing exactly the same right now?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is everyone dressing...',
        'Why is everyone dressing exactly the same right now?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My cart is full...',
        'My cart is full but my bank account says no.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'sofia_thomas949_66@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'sofia_thomas949'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/women/5.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Denis Villeneuve can do...',
        'Denis Villeneuve can do no wrong. I will defend him with my life.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'aiden_morgan399_67@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'aiden_morgan399'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'We go Jim 🏋️‍♂️ | 225 bench | Bulk szn',
        avatar_url = 'https://randomuser.me/api/portraits/women/44.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The pump was absolutely...',
        'The pump was absolutely unreal today.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'noah_ruiz412_68@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'noah_ruiz412'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/women/90.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'violet_campbell567_69@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'violet_campbell567'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Archive fashion enthusiast 👟 | Rick Owens',
        avatar_url = 'https://randomuser.me/api/portraits/women/65.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Taking an L on...',
        'Taking an L on the SNKRS app again. A tale as old as time.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is everyone dressing...',
        'Why is everyone dressing exactly the same right now?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My cart is full...',
        'My cart is full but my bank account says no.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'mia_patel138_70@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'mia_patel138'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/women/43.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If they don''t bring...',
        'If they don''t bring back the old cast, I''m rioting.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'riley_gray361_71@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'riley_gray361'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Army 💜 | Stray Kids everywhere all around the world',
        avatar_url = 'https://randomuser.me/api/portraits/women/29.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My bank account is...',
        'My bank account is crying because of all these album versions.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Did you see their...',
        'Did you see their new comeback concept photos?? I''m screaming.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'joseph_morgan432_72@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'joseph_morgan432'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/women/90.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'nathan_nelson641_73@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'nathan_nelson641'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Building the next big AI wrapper 🚀 | ex-FAANG',
        avatar_url = 'https://randomuser.me/api/portraits/women/8.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Just bought another domain...',
        'Just bought another domain name for a project I''ll never finish.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Just bought another domain...',
        'Just bought another domain name for a project I''ll never finish.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Just bought another domain...',
        'Just bought another domain name for a project I''ll never finish.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'carter_turner460_74@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'carter_turner460'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'GRWM / Day in the life ✨ | Link in bio',
        avatar_url = 'https://randomuser.me/api/portraits/men/37.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The TikTok algorithm is...',
        'The TikTok algorithm is so broken today, I''m getting 0 views.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'daniel_kim682_75@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'daniel_kim682'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/women/56.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'james_reed729_76@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'james_reed729'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/men/28.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it Sunday yet?...',
        'Is it Sunday yet? I need to see cars going in circles.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'camila_campbell457_77@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'camila_campbell457'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Still not over the Eras Tour 🪩 | Folkmore apologist',
        avatar_url = 'https://randomuser.me/api/portraits/women/27.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reputation Taylor''s Version is...',
        'Reputation Taylor''s Version is coming, I can feel it in my bones.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I think I need...',
        'I think I need to watch the Eras Tour movie for the 5th time this week.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why does ''All Too...',
        'Why does ''All Too Well'' still hurt so much after all these years?',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'victoria_hill854_78@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'victoria_hill854'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Phoebe Bridgers and indie movies 🎥',
        avatar_url = 'https://randomuser.me/api/portraits/women/61.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'A24 merch is the...',
        'A24 merch is the only thing I spend my money on.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Is it possible to...',
        'Is it possible to listen to Boygenius too much? Asking for a friend.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Past Lives absolutely destroyed...',
        'Past Lives absolutely destroyed me. I''m still recovering.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'elijah_williams108_79@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'elijah_williams108'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/men/74.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'aaron_hernandez72_80@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'aaron_hernandez72'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/men/18.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'skylar_rivera496_81@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'skylar_rivera496'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/99.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'noah_robinson521_82@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'noah_robinson521'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Charles Leclerc apologist 🏎️ | F1 fan',
        avatar_url = 'https://randomuser.me/api/portraits/women/43.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Lights out and away...',
        'Lights out and away we go! My heart rate is 150bpm.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Being a Ferrari fan...',
        'Being a Ferrari fan is purely pain at this point.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jack_ruiz458_83@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jack_ruiz458'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Chronically online 📱 | Meme historian',
        avatar_url = 'https://randomuser.me/api/portraits/women/81.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My screen time is...',
        'My screen time is honestly embarrassing.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I spoke in full...',
        'I spoke in full internet slang today and my mom looked terrified.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jacob_wright529_84@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jacob_wright529'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Army 💜 | Stray Kids everywhere all around the world',
        avatar_url = 'https://randomuser.me/api/portraits/men/72.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Trying to learn the...',
        'Trying to learn the new choreo but I have two left feet.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Trying to learn the...',
        'Trying to learn the new choreo but I have two left feet.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'grayson_scott34_85@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'grayson_scott34'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/women/69.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'grace_lewis939_86@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'grace_lewis939'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'HODL 🚀 | Web3 is the future',
        avatar_url = 'https://randomuser.me/api/portraits/men/43.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Buying the dip because...',
        'Buying the dip because I hate money apparently.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Buying the dip because...',
        'Buying the dip because I hate money apparently.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'daniel_diaz102_87@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'daniel_diaz102'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Chronically online 📱 | Meme historian',
        avatar_url = 'https://randomuser.me/api/portraits/women/12.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I have a meme...',
        'I have a meme for every possible situation.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I have a meme...',
        'I have a meme for every possible situation.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My screen time is...',
        'My screen time is honestly embarrassing.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I have a meme...',
        'I have a meme for every possible situation.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'owen_ortiz472_88@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'owen_ortiz472'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Grinding rank 🎮 | Elden Ring DLC consumed me',
        avatar_url = 'https://randomuser.me/api/portraits/women/9.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My sleep schedule is...',
        'My sleep schedule is completely ruined. One more game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Valorant matchmaking is a...',
        'Valorant matchmaking is a social experiment.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I''ve died to this...',
        'I''ve died to this boss 50 times. I love this game.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'leah_edwards123_89@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'leah_edwards123'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'HODL 🚀 | Web3 is the future',
        avatar_url = 'https://randomuser.me/api/portraits/women/25.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I refuse to sell,...',
        'I refuse to sell, diamond hands baby.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If Bitcoin hits 100k...',
        'If Bitcoin hits 100k I''m buying a terrible island.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I refuse to sell,...',
        'I refuse to sell, diamond hands baby.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I refuse to sell,...',
        'I refuse to sell, diamond hands baby.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'layla_scott715_90@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'layla_scott715'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/men/24.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'madison_hall294_91@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'madison_hall294'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Building the next big AI wrapper 🚀 | ex-FAANG',
        avatar_url = 'https://randomuser.me/api/portraits/women/54.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'GPT-5 is going to...',
        'GPT-5 is going to make all our jobs obsolete anyway.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Does anyone else miss...',
        'Does anyone else miss the old internet? The vibes are just off now.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Just bought another domain...',
        'Just bought another domain name for a project I''ll never finish.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'leah_davis873_92@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'leah_davis873'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Dune 2 is cinematic perfection 🎬 | Letterboxd user',
        avatar_url = 'https://randomuser.me/api/portraits/women/93.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just watched a...',
        'I just watched a 4-hour video essay on YouTube about a movie I haven''t even seen.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My Letterboxd top 4...',
        'My Letterboxd top 4 says everything you need to know about my mental health.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'grace_rivera653_93@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'grace_rivera653'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/women/79.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Oat milk matcha latte...',
        'Oat milk matcha latte is a personality trait.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'logan_moore703_94@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'logan_moore703'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Chronically online 📱 | Meme historian',
        avatar_url = 'https://randomuser.me/api/portraits/men/45.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I spoke in full...',
        'I spoke in full internet slang today and my mom looked terrified.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I have a meme...',
        'I have a meme for every possible situation.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'My screen time is...',
        'My screen time is honestly embarrassing.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jaxon_wilson868_95@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jaxon_wilson868'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'HODL 🚀 | Web3 is the future',
        avatar_url = 'https://randomuser.me/api/portraits/men/41.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If Bitcoin hits 100k...',
        'If Bitcoin hits 100k I''m buying a terrible island.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If Bitcoin hits 100k...',
        'If Bitcoin hits 100k I''m buying a terrible island.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'emily_hall861_96@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'emily_hall861'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Love Island is my personality 📺 | Don''t text',
        avatar_url = 'https://randomuser.me/api/portraits/men/50.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I can''t believe the...',
        'I can''t believe the drama on the latest season of The Traitors.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If they don''t bring...',
        'If they don''t bring back the old cast, I''m rioting.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Reality TV is the...',
        'Reality TV is the only thing keeping me sane rn.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'If they don''t bring...',
        'If they don''t bring back the old cast, I''m rioting.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'andrew_edwards302_97@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'andrew_edwards302'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'GRWM / Day in the life ✨ | Link in bio',
        avatar_url = 'https://randomuser.me/api/portraits/men/52.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The TikTok algorithm is...',
        'The TikTok algorithm is so broken today, I''m getting 0 views.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'jack_alvarez956_98@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'jack_alvarez956'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Sarah J. Maas enthusiast 📚 | BookTok',
        avatar_url = 'https://randomuser.me/api/portraits/women/55.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'ACOTAR literally changed my...',
        'ACOTAR literally changed my brain chemistry.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The enemies to lovers...',
        'The enemies to lovers slow burn in this series is unmatched.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just bought 5...',
        'I just bought 5 more books I won''t read because the covers are pretty.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'lillian_ramos54_99@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'lillian_ramos54'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'GRWM / Day in the life ✨ | Link in bio',
        avatar_url = 'https://randomuser.me/api/portraits/women/20.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'The TikTok algorithm is...',
        'The TikTok algorithm is so broken today, I''m getting 0 views.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Romanticizing my life by...',
        'Romanticizing my life by romanticizing my $8 iced coffee.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Honestly, the Charlotte Tilbury...',
        'Honestly, the Charlotte Tilbury flawless filter is worth the hype.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
        'penelope_davis676_100@example.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        jsonb_build_object('username', 'penelope_davis676'),
        now() - (random() * interval '90 days'), 
        now() - (random() * interval '90 days')
    );
    user_ids := array_append(user_ids, new_user_id);
    
    UPDATE public.profiles
    SET bio = 'Rating every matcha in the city 🍵',
        avatar_url = 'https://randomuser.me/api/portraits/women/86.jpg'
    WHERE id = new_user_id;
  
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'Why is eating out...',
        'Why is eating out so expensive now? $25 for a salad is criminal.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
    INSERT INTO public.notes (title, content, author_id, created_at)
    VALUES (
        'I just found the...',
        'I just found the best hidden gem cafe. No, I will not drop the location.',
        new_user_id,
        now() - (random() * interval '60 days')
    ) RETURNING id INTO new_note_id;
    note_ids := array_append(note_ids, new_note_id);
    
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
