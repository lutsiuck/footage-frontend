import { TournamentStatusesEnum } from "../enums/tournament-statuses.enam";
import { TournamentTypes } from "../enums/tournament-types.enum";

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
  // TODO:
  teams?: any[];
}
