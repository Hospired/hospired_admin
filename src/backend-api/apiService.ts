import { supabase } from "../lib/supabaseClient";
import { AdminUserRes } from "./dtos";

export async function getAdminUser(id: string) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // expects only one row (or null)

  if (error) {
    throw new Error(`Error fetching admin user: ${error.message}`);
  }

  if (!data) return null;

  const result: AdminUserRes = {
    id: data.id,
    first_name: data.first_name,
    second_name: data.second_name ?? undefined,
    first_last_name: data.first_last_name,
    second_last_name: data.second_last_name ?? undefined,
    is_physician: data.is_physician,
    is_super_user: data.is_super_user,
    avatar: data.avatar ?? undefined,
    date_of_birth: data.date_of_birth
      ? new Date(data.date_of_birth)
      : undefined,
    created_at: new Date(data.created_at),
  };

  return result;
}

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

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Signin error:", error.message);
    throw error;
  }

  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Signout error:", error.message);
    throw error;
  }
}
