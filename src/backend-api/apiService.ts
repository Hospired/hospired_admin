import { supabase } from "../lib/supabaseClient";

export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/welcome-new-user",
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
    throw error;
  }

  return data;
}
