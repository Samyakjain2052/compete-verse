
export type UserRole = "participant" | "host";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface UserProfile extends User {
  name?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  age?: number;
  university?: string;
  company?: string;
  skills?: string[];
  verified?: boolean;
}
