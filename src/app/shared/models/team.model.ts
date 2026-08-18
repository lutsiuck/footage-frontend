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
}
