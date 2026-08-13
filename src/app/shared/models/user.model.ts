export interface IUser {
  id: number;
  email: string;
  name: string;
	avatar_url?: string,
  city?: string;
	is_player: boolean,
	is_organizer: boolean,
	created_at: string
}