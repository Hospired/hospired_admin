// Data transfer obejects

export type AdminUserRes = {
  id: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  isPhysician: boolean;
  isSuperUser: boolean;
  avatar?: string;
  dateOfBirth?: Date;
  createdAt: Date;
};

export type CreateAdminUserReq = {
  id: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  isPhysician: boolean;
  isSuperUser: boolean;
  dateOfBirth?: Date;
  avatar?: string;
};

export type CreatePhysicianReq = {
  adminUserId: string;
  nationalId: string;
  licenseId: string;
  specialty: string;
  public_email: string;
  phone_number: string;
  notes?: string;
};

export type PhysicianRes = {
  id: number;
  adminUserId: string;
  nationalId: string;
  licenseId: string;
  specialty: string;
  public_email: string;
  phone_number: string;
  notes?: string;
  createdAt: Date;
};

export type PhysicianWithAdminUser = PhysicianRes & {
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
};

export const medicalSpecialtyMap: Record<string, string> = {
  "General Practice": "Medicina General",
  "Internal Medicine": "Medicina Interna",
  "Family Medicine": "Medicina Familiar",
  "Pediatrics": "Pediatría",
  "Cardiology": "Cardiología",
  "Dermatology": "Dermatología",
  "Neurology": "Neurología",
  "Psychiatry": "Psiquiatría",
  "Oncology": "Oncología",
  "Orthopedics": "Ortopedia",
  "Radiology": "Radiología",
  "Anesthesiology": "Anestesiología",
  "Emergency Medicine": "Medicina de Emergencias",
  "Surgery": "Cirugía",
  "Gynecology": "Ginecología",
  "Urology": "Urología",
  "Ophthalmology": "Oftalmología",
  "Otolaryngology": "Otorrinolaringología",
};

export type CreateAppUserReq = {
  id: string;
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  dateOfBirth?: Date;
  avatar?: string;
};

export type CreatePatientReq = {
  appUserId: string;
  nationalId: string;
  inss: number;
  phone: string;
  occupation?: string;
  address: string;
  municipalityId: number;
  medicalNotes?: string;
};

export type AppUserRes = {
  id: string;
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  avatar?: string;
  dateOfBirth?: Date;
  createdAt: Date;
};

export type PatientRes = {
  id: number;
  appUserId: string;
  nationalId: string;
  inss: number;
  phone: string;
  occupation?: string;
  address: string;
  municipalityId: number;
  medicalNotes?: string;
  createdAt: Date;
};

export type PatientWithUser = {
  id: number;
  appUserId?: string;
  nationalId: string;
  inss: number;
  phone: string;
  occupation?: string;
  address: string;
  municipalityId?: number;
  municipalityName?: string;
  department?: string;
  medicalNotes?: string;
  createdAt: Date;
  fullName: string;
  dateOfBirth?: Date;
};

export type Municipality = {
  id: number;
  name?: string;
  department: string;
  createdAt?: Date;
};

// HEALTHCARE FACILITIES
export type HealthcareFacilityRes = {
  id: number;
  name: string;
  servesInss: boolean;
  isPublicMinsa: boolean;
  address: string;
  district: string;
  municipalityId: number;
  latitude: number;
  longitude: number;
  notes?: string;
  createdAt: Date;
  municipalityName?: string;
  department?: string;
  unitsCount: number;
};

export type CreateHealthcareFacilityReq = {
  name: string;
  servesInss: boolean;
  isPublicMinsa: boolean;
  address: string;
  district: string;
  municipalityId: number;
  latitude: number;
  longitude: number;
  notes?: string;
};

// FACILITY UNITS
export type FacilityUnitRes = {
  id: number;
  facilityId: number;
  name: string;
  indications?: string;
  createdAt: Date;
  facilityName?: string;
};

export type CreateFacilityUnitReq = {
  facilityId: number;
  name: string;
  indications?: string;
};

 // Citas
export type AppointmentStatus =
  | "requested"
  | "scheduled"
  | "completed"
  | "canceled"
  | "no_show";

/** Mapeo de estados de cita → texto legible en español */
export const appointmentStatusMap: Record<AppointmentStatus, string> = {
  requested: "Solicitada",
  scheduled: "Programada",
  completed: "Completada",
  canceled: "Cancelada",
  no_show: "No asistió",
};
export type CreateAppointmentReq = {
  patientId: number;
  physicianId?: number;
  motive: string;
  specialty: string;
  status?: AppointmentStatus;
  start?: Date;
  end?: Date;
  facilityUnitId?: number;
};

export type AppointmentRes = {
  id: number;
  patientId: number;
  physicianId?: number;
  motive: string;
  specialty: string;
  status: AppointmentStatus;
  start?: Date;
  end?: Date;
  facilityUnitId?: number;
  createdAt: Date;
};

export type AppointmentWithDetails = {
  id: number;
  patientId: number;
  patientName: string;
  physicianName?: string;
  motive: string;
  specialty: string;
  status: AppointmentStatus;
  facilityUnitName?: string;
  facilityName?: string;
  start?: Date;
  end?: Date;
  createdAt: Date;
};