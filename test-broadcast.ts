import { createClient } from "@supabase/supabase-js";
async function run() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const channel = supabase.channel('test');
    const res = channel.send({ type: "broadcast", event: "test", payload: {} });
    console.log("Send result (sync call):", res);
}
run();
