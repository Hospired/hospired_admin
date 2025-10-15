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
  CreateHealthcareFacilityReq,
  HealthcareFacilityRes,
  CreateFacilityUnitReq,
  FacilityUnitRes,
  CreateAppointmentReq,
  AppointmentRes,
  AppointmentWithDetails,
  PhysicianWithAdminUser
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

export async function updatePhysician(id: number, data: {
  licenseId: string;
  specialty: string;
  public_email: string;
  phone_number: string;
  notes?: string;
}) {
  const { error } = await supabase
    .from("physicians")
    .update({
      license_id: data.licenseId,
      specialty: data.specialty,
      public_email: data.public_email,
      phone_number: data.phone_number,
      notes: data.notes ?? null
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
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

export async function getAllPhysicians(): Promise<PhysicianWithAdminUser[]> {
  const { data, error } = await supabase
    .from("physicians")
    .select(`
      id,
      admin_user_id,
      national_id,
      license_id,
      specialty,
      public_email,
      phone_number,
      notes,
      created_at,
      admin_users (
        first_name,
        second_name,
        first_last_name,
        second_last_name
      )
    `);

  if (error) throw new Error(`Error al obtener médicos: ${error.message}`);

  return (data ?? []).map((p: any) => ({
    id: p.id,
    adminUserId: p.admin_user_id,
    nationalId: p.national_id,
    licenseId: p.license_id,
    specialty: p.specialty,
    public_email: p.public_email,
    phone_number: p.phone_number,
    notes: p.notes ?? undefined,
    createdAt: new Date(p.created_at),
    firstName: p.admin_users?.first_name ?? "",
    secondName: p.admin_users?.second_name ?? "",
    firstLastName: p.admin_users?.first_last_name ?? "",
    secondLastName: p.admin_users?.second_last_name ?? "",
  }));
}

//User

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

export async function invitePatientUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return { user: data.user }; // <--- aquí accedes correctamente al usuario
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

export async function getAllPatients() {
  const { data, error } = await supabase
    .from("patients")
    .select(`
      id,
      app_user_id,
      national_id,
      inss_id,
      phone_number,
      occupation,
      neighborhood,
      municipality_id,
      medical_notes,
      created_at,
      app_users (
        id,
        first_name,
        second_name,
        first_last_name,
        second_last_name,
        date_of_birth
      ),
      municipalities (
        id,
        name,
        department
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al obtener pacientes: ${error.message}`);

  return (data ?? []).map((p: any) => ({
    id: p.id,
    appUserId: p.app_users?.id,
    nationalId: p.national_id ?? "",
    inss: p.inss_id ?? 0,
    phone: p.phone_number ?? "",
    occupation: p.occupation ?? "",
    address: p.neighborhood ?? "",
    municipalityId: p.municipality_id ?? 0,
    municipalityName: p.municipalities?.name ?? "",
    department: p.municipalities?.department ?? "",
    medicalNotes: p.medical_notes ?? "",
    createdAt: new Date(p.created_at),
    fullName: `${p.app_users?.first_name ?? ""} ${p.app_users?.second_name ?? ""} ${
      p.app_users?.first_last_name ?? ""
    } ${p.app_users?.second_last_name ?? ""}`.trim(),
    dateOfBirth: p.app_users?.date_of_birth ? new Date(p.app_users.date_of_birth) : undefined,
  }));
}

export async function deletePatient(id: string | number) {
  const res = await fetch(`/api/patients/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("No se pudo eliminar el paciente")
  return true
}

export async function updatePatient(id: number, data: {
  nationalId: string;
  inss: number;
  phone: string;
  occupation?: string;
  address: string;
  medicalNotes?: string;
  municipalityId?: number;
}) {
  const { error } = await supabase
    .from("patients")
    .update({
      national_id: data.nationalId,
      inss_id: data.inss,
      phone_number: data.phone,
      occupation: data.occupation ?? null,
      neighborhood: data.address,
      medical_notes: data.medicalNotes ?? null,
      municipality_id: data.municipalityId ?? null,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getMunicipalities() {
  const { data, error } = await supabase
    .from("municipalities")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(`Error al obtener municipios: ${error.message}`);
  return data ?? [];
}

//Centros
export async function createHealthcareFacility(req: CreateHealthcareFacilityReq) {
  const { data, error } = await supabase
    .from("healthcare_facilities")
    .insert({
      name: req.name,
      serves_inss: req.servesInss,
      is_public_minsa: req.isPublicMinsa,
      address: req.address,
      district: req.district,
      municipality_id: req.municipalityId,
      latitude: req.latitude,
      longitude: req.longitude,
      notes: req.notes ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear instalación: ${error.message}`);

  return {
    id: data.id,
    name: data.name,
    servesInss: data.serves_inss,
    isPublicMinsa: data.is_public_minsa,
    address: data.address,
    district: data.district,
    municipalityId: data.municipality_id,
    latitude: data.latitude,
    longitude: data.longitude,
    notes: data.notes ?? undefined,
    createdAt: new Date(data.created_at),
  } as HealthcareFacilityRes;
}

export async function getHealthcareFacilities(): Promise<HealthcareFacilityRes[]> {
  const { data, error } = await supabase
    .from("healthcare_facilities")
    .select(`
      id,
      name,
      serves_inss,
      is_public_minsa,
      address,
      district,
      municipality_id,
      latitude,
      longitude,
      notes,
      created_at,
      municipalities (
        name,
        department
      ),
      facility_units (
        id
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al obtener instalaciones: ${error.message}`);

  return (data ?? []).map((f: any) => ({
    id: f.id,
    name: f.name,
    servesInss: f.serves_inss,
    isPublicMinsa: f.is_public_minsa,
    address: f.address,
    district: f.district,
    municipalityId: f.municipality_id,
    latitude: f.latitude,
    longitude: f.longitude,
    notes: f.notes ?? undefined,
    createdAt: new Date(f.created_at),
    municipalityName: f.municipalities?.name ?? "",
    department: f.municipalities?.department ?? "",
    unitsCount: f.facility_units ? f.facility_units.length : 0 // <-- NUEVO
  }));
}

//Unidades

export async function createFacilityUnit(req: CreateFacilityUnitReq) {
  const { data, error } = await supabase
    .from("facility_units")
    .insert({
      facility_id: req.facilityId,
      name: req.name,
      indications: req.indications ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear unidad: ${error.message}`);

  return {
    id: data.id,
    facilityId: data.facility_id,
    name: data.name,
    indications: data.indications ?? undefined,
    createdAt: new Date(data.created_at),
  } as FacilityUnitRes;
}

export async function getFacilityUnits(facilityId: number): Promise<FacilityUnitRes[]> {
  const { data, error } = await supabase
    .from("facility_units")
    .select(`
      id,
      facility_id,
      name,
      indications,
      created_at,
      healthcare_facilities(name)
    `)
    .eq("facility_id", facilityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al obtener unidades: ${error.message}`);

  return (data ?? []).map((u: any) => ({
    id: u.id,
    facilityId: u.facility_id,
    name: u.name,
    indications: u.indications ?? "",
    createdAt: new Date(u.created_at),
    facilityName: u.healthcare_facilities?.name ?? "",
  }));
}

// --- APPOINTMENTS ---

export async function createAppointment(req: CreateAppointmentReq): Promise<AppointmentRes> {
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      patient_id: req.patientId,
      physician_id: req.physicianId ?? null,
      motive: req.motive,
      specialty: req.specialty,
      status: req.status ?? "requested",
      start: req.start ? req.start.toISOString() : null,
      end: req.end ? req.end.toISOString() : null,
      facility_unit_id: req.facilityUnitId ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Error al crear cita: ${error.message}`);

  return {
    id: data.id,
    patientId: data.patient_id,
    physicianId: data.physician_id ?? undefined,
    motive: data.motive,
    specialty: data.specialty,
    status: data.status,
    start: data.start ? new Date(data.start) : undefined,
    end: data.end ? new Date(data.end) : undefined,
    facilityUnitId: data.facility_unit_id ?? undefined,
    createdAt: new Date(data.created_at),
  };
}

export async function getAllAppointments(): Promise<AppointmentWithDetails[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      patient_id,
      physician_id,
      motive,
      specialty,
      status,
      start,
      end,
      facility_unit_id,
      created_at,
      patients (
        id,
        app_users (
          first_name,
          second_name,
          first_last_name,
          second_last_name
        )
      ),
      physicians (
        id,
        admin_users (
          first_name,
          second_name,
          first_last_name,
          second_last_name
        )
      ),
      facility_units (
        id,
        name,
        healthcare_facilities (
          id,
          name
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Error al obtener citas: ${error.message}`);

  return (data ?? []).map((a: any) => ({
    id: a.id,
    patientId: a.patient_id,
    physicianId: a.physician_id ?? undefined,
    motive: a.motive,
    specialty: a.specialty,
    status: a.status,
    start: a.start ? new Date(a.start) : undefined,
    end: a.end ? new Date(a.end) : undefined,
    facilityUnitId: a.facility_unit_id ?? undefined,
    facilityUnitName: a.facility_units?.name ?? "",
    facilityName: a.facility_units?.healthcare_facilities?.name ?? "",
    patientName: `${a.patients?.app_users?.first_name ?? ""} ${a.patients?.app_users?.second_name ?? ""} ${a.patients?.app_users?.first_last_name ?? ""} ${a.patients?.app_users?.second_last_name ?? ""}`.trim(),
    physicianName: a.physicians
      ? `${a.physicians?.admin_users?.first_name ?? ""} ${a.physicians?.admin_users?.first_last_name ?? ""}`.trim()
      : undefined,
    createdAt: new Date(a.created_at),
  }));
}

export async function getAppointmentsByPatientId(patientId: number) {
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      start,
      end,
      motive,
      specialty,
      status,
      created_at,
      physician_id,
      physicians (
        id,
        admin_user_id,
        national_id,
        license_id,
        specialty,
        public_email,
        phone_number
      )
    `)
    .eq("patient_id", patientId)
    .order("start", { ascending: false });

  if (error) throw new Error(`Error al obtener citas: ${error.message}`);
  return data ?? [];
}

export async function updateAppointment(
  id: number,
  updates: Partial<CreateAppointmentReq>
): Promise<void> {
  const { error } = await supabase
    .from("appointments")
    .update({
      physician_id: updates.physicianId ?? null,
      motive: updates.motive,
      specialty: updates.specialty,
      status: updates.status,
      start: updates.start ? updates.start.toISOString() : null,
      end: updates.end ? updates.end.toISOString() : null,
      facility_unit_id: updates.facilityUnitId ?? null,
    })
    .eq("id", id);

  if (error) throw new Error(`Error al actualizar cita: ${error.message}`);
}

export async function deleteAppointment(id: number): Promise<void> {
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error al eliminar cita: ${error.message}`);
}
