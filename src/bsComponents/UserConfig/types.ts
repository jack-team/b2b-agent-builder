export type UserRole = 'super_admin' | 'admin' | 'audit_admin';

export type UserStatus = 'enabled' | 'disabled';

export interface UserRecord {
  key: string;
  name: string;
  email: string;
  phone?: string;
  merchant: string;
  department?: string;
  jobTitle?: string;
  role: UserRole;
  lastLogin: string;
  status: UserStatus;
  avatarColor: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  merchant: string;
  department: string;
  jobTitle: string;
  role?: UserRole;
  status?: boolean;
  welcomeEmail?: boolean;
}

export interface UserConfigProps {
  onClose?: () => void;
  record?: UserRecord;
}
