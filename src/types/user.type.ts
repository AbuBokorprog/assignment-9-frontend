export const userStatus = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
  SUSPEND: 'SUSPEND',
  DELETED: 'DELETED',
};

export type TAdmin = {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  contactNumber: string;
};

export interface TUser {
  id: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  customer: TAdmin;
}
