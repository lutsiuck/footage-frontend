export interface IUser {
  id: string;
  email: string;
  name: string;
	avatar_url?: string,
  city?: string;
	is_player: boolean,
	is_organizer: boolean,
	created_at: string
}

export interface IPlayer extends Omit<IUser, 'email' | 'city' | 'created_at' | 'is_player' | 'is_organizer'> {
  
}