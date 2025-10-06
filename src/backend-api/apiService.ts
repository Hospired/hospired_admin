import { supabase } from "../lib/supabaseClient";
import {
  AdminUserRes,
  CreateAdminUserReq,
  CreatePhysicianReq,
  PhysicianRes,
} from "./dtos";

export async function createAdminUser(req: CreateAdminUserReq) {
  const { error } = await supabase
    .from("admin_users")
    .insert({
      id: req.id,
      first_name: req.firstName,
      second_name: req.secondName ?? null,
      first_last_name: req.firstLastName,
      second_last_name: req.secondLastName ?? null,
      is_physician: req.isPhysician,
      is_super_user: false,
      date_of_birth: req.dateOfBirth
        ? req.dateOfBirth.toISOString()
        : null,
      avatar: req.avatar ?? null,
    });

  if (error) {
    throw error; //Error(`Error al crear admin user: ${error.message}`)
  } 
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
    firstLastName: data.first_Last_Name,
    secondLastName: data.second_Last_Name ?? undefined,
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

export async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error("No se pudo obtener el usuario autenticado");
  }

  return data.user;
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
