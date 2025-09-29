// Data transfer obejects

export type AdminUserRes = {
  id: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  is_physician: boolean;
  is_super_user: boolean;
  avatar?: string;
  date_of_birth?: Date;
  created_at: Date;
};

export type CreateAdminUserReq = {
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  is_physician: boolean;
  is_super_user: boolean;
  date_of_birth?: Date;
};
