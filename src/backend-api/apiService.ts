import { supabase } from "../lib/supabaseClient";
import {
  AdminUserRes,
  CreateAdminUserReq,
  CreatePhysicianReq,
  PhysicianRes,
  PatientRes,
  AppUserRes,
  CreateAppUserReq,
  CreatePatientReq,
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
  const { error } = await supabase
    .from("physicians")
    .insert({
      admin_user_id: req.adminUserId,
      national_id: req.nationalId,
      license_id: req.licenseId,
      specialty: req.specialty, // debe coincidir con ENUM en inglés
      public_email: req.public_email,
      phone_number: req.phone_number,
      notes: req.notes ?? null,
    });

  if (error) {
    throw error;
  }
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
    firstLastName: data.first_last_name,
    secondLastName: data.second_last_name ?? undefined,
    isPhysician: data.is_physician,
    isSuperUser: data.is_super_user,
    avatar: data.avatar ?? undefined,
    dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
    createdAt: new Date(data.created_at),
  };

  return result;
}

export async function getPhysicianByAdminUserId(adminUserId: string) {
  const { data, error } = await supabase
    .from("physicians")
    .select("*")
    .eq("admin_user_id", adminUserId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    adminUserId: data.admin_user_id,
    nationalId: data.national_id,
    licenseId: data.license_id,
    specialty: data.specialty,
    public_email: data.public_email,
    phone_number: data.phone_number,
    notes: data.notes ?? undefined,
    createdAt: new Date(data.created_at),
  };
}

export async function updatePhysician(id: number, updates: Partial<CreatePhysicianReq>) {
  const { error } = await supabase
    .from("physicians")
    .update({
      specialty: updates.specialty,
      license_id: updates.licenseId,
      public_email: updates.public_email,
      phone_number: updates.phone_number,
      notes: updates.notes ?? null,
    })
    .eq("id", id);

  if (error) {
    console.error("Error actualizando physician:", error.message);
    throw error;
  }
}

export async function getPhysicianById(physicianId: number): Promise<PhysicianRes | null> {
  const { data, error } = await supabase
    .from("physicians")
    .select("*")
    .eq("id", physicianId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    adminUserId: data.admin_user_id,
    nationalId: data.national_id,
    licenseId: data.license_id,
    specialty: data.specialty,
    public_email: data.public_email,
    phone_number: data.phone_number,
    notes: data.notes ?? undefined,
    createdAt: new Date(data.created_at),
  };
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

//Pacientes

// --- APP USERS ---

export async function createAppUser(req: CreateAppUserReq) {
  const { data, error } = await supabase
    .from("app_users")
    .insert({
      id: req.id,
      first_name: req.firstName,
      second_name: req.secondName ?? null,
      first_last_name: req.firstSurname,
      second_last_name: req.secondSurname ?? null,
      date_of_birth: req.dateOfBirth ? req.dateOfBirth.toISOString() : null,
      avatar: req.avatar ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear app_user: ${error.message}`);
  return data;
}

export async function getAppUser(id: string): Promise<AppUserRes | null> {
  const { data, error } = await supabase
    .from("app_users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Error al obtener app_user: ${error.message}`);
  if (!data) return null;

  return {
    id: data.id,
    firstName: data.first_name,
    secondName: data.second_name ?? undefined,
    firstSurname: data.first_last_name,
    secondSurname: data.second_last_name ?? undefined,
    avatar: data.avatar ?? undefined,
    dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
    createdAt: new Date(data.created_at),
  };
}

// --- PATIENTS ---

export async function createPatient(req: CreatePatientReq) {
  const user = await getAppUser(req.appUserId);
  if (!user) throw new Error("El app_user_id especificado no existe");

  const { data, error } = await supabase
    .from("patients")
    .insert({
      app_user_id: req.appUserId,
      national_id: req.nationalId,
      inss_id: req.inss,
      phone_number: req.phone,
      occupation: req.occupation ?? null,
      neighborhood: req.address,
      municipality_id: req.municipalityId,
      medical_notes: req.medicalNotes ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear paciente: ${error.message}`);
  return data;
}

export async function getPatientByAppUserId(appUserId: string): Promise<PatientRes | null> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("app_user_id", appUserId)
    .maybeSingle();

  if (error) throw new Error(`Error al obtener paciente: ${error.message}`);
  if (!data) return null;

  return {
    id: data.id,
    appUserId: data.app_user_id,
    nationalId: data.national_id,
    inss: data.inss_id,
    phone: data.phone_number,
    occupation: data.occupation ?? undefined,
    address: data.neighborhood,
    municipalityId: data.municipality_id,
    medicalNotes: data.medical_notes ?? undefined,
    createdAt: new Date(data.created_at),
  };
}
