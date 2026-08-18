import { TournamentStatusesEnum } from "../enums/tournament-statuses.enum";
import { TournamentTypes } from "../enums/tournament-types.enum";
import { ITeam } from "./team.model";

export interface ITournamentQuery {
  items: ITournament[];
  total: number;
  limit: number;
  offset: number;
}

export interface ITournament {
  id?: string;
  logo?: string;
  name: string;
  type: TournamentTypes;
  status?: TournamentStatusesEnum;
  start_date?: string;
  end_date?: string;
  created_by?: string;
  city?: string;
  teams?: ITeam[];
}
