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
