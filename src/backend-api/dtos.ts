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
