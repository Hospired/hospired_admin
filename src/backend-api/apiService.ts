import { supabase } from "../lib/supabaseClient";
import {
  AdminUserRes,
  CreateAdminUserReq,
  CreatePhysicianReq,
  PhysicianRes,
} from "./dtos";

export async function createAdminUser(req: CreateAdminUserReq) {
  // TODO
}

export async function createPhysician(req: CreatePhysicianReq) {
  // TODO
}

export async function getAdminUser(id: string) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // expects only one row (or null) single create admin user

  if (error) {
    throw error; //new Error(`Error fetching admin user: ${error.message}`);
  }

  if (!data) return null;

  const result: AdminUserRes = {
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name ?? undefined,
    firstLastName: data.firstLastName,
    secondLastName: data.secondLastName ?? undefined,
    isPhysician: data.is_physician,
    isSuperUser: data.is_super_user,
    avatar: data.avatar ?? undefined,
    dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
    createdAt: new Date(data.created_at),
  };

  return result;
}

export async function getPhysicianByAdminUserId(adminUserId: string) {
  // TODO: returns PhysicianRes
}

export async function getPhysicianById(physicianId: number) {
  // TODO: returns PhysicianRes
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
