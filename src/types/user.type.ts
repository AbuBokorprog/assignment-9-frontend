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
