import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
export const supabaseUrl = "https://kgwqmyzvibczykcytqbd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd3FteXp2aWJjenlrY3l0cWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1ODE5MDksImV4cCI6MjAwOTE1NzkwOX0.rzIf8XF_4bSQK-s8YT00L01IkCwAeH4RJvqEoZma56o";
const supabase = createClient<Database>(supabaseUrl, supabaseKey!);

export default supabase;
