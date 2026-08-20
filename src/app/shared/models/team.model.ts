import { MembershipStatuses } from "../enums/membership-statuses.enum";
import { TournamentStatusesEnum } from "../enums/tournament-statuses.enum";
import { TournamentTypes } from "../enums/tournament-types.enum";

export interface ITeamQuery {
  items: ITeam[];
  total: number;
  limit: number;
  offset: number;
}

export interface ITeam {
  id?: string;
  logo_url?: string;
  name: string;
  city?: string;
  status?: MembershipStatuses;
  created_by?: string;
  created_at?: string;
  team_members?: ITeamMembers[];
}

export interface ITeamMembers {
  id: string;
  team_id: string;
  user: {
    id: string,
    name: string,
    avatar_url?: string
  }
}