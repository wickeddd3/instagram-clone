import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const verifySupabaseToken = async (token: string) => {
  if (!token) return null;

  // Remove "Bearer " prefix if it exists
  const jwt = token.replace("Bearer ", "");

  // This calls Supabase to verify the token is valid and active
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(jwt);

  if (error || !user) {
    console.error("Auth Error:", error?.message);
    return null;
  }

  return user.id; // Returns the UUID of the user
};
