export interface IRegister {
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
  city?: string;
  is_organizer?: boolean;
}