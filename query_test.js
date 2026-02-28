const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://tzzfblwjokhcyofnfysv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6emZibHdqb2toY3lvZm5meXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5Njg2NzIsImV4cCI6MjA4NzU0NDY3Mn0.djRkQHldyOBAWkZTcbscLOKSY8XLIDVfZRZZX6wx5RU');
async function test() {
  const { data, error } = await supabase
    .from("notes")
    .select(`
      id, 
      title, 
      content, 
      created_at, 
      profiles(username),
      note_likes(count)
    `)
    .order("created_at", { ascending: false });
  console.log("Error:", error);
}
test();
