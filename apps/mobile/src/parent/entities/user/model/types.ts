export interface UserProfile {
  name: string;
  age: string;
  phone: string;
  avatarUri?: string;
}

export interface ChildUser {
  id: string;
  name: string;
  phone: string;
  isOnline?: boolean;
}
