import { TournamentTypes } from "../enums/tournament-types.enum";

export const TOURNAMENT_TYPES = [
  {
    value: TournamentTypes.LEAGUE,
    label: 'League',
    desc: 'Everyone plays everyone.Best for long seasons.'
  },
  {
    value: TournamentTypes.KNOCKOUT,
    label: 'Knockout',
    desc: 'Single or double elimination knockout stage.'
  },
  {
    value: TournamentTypes.GROUP_KNOCKOUT,
    label: 'Group Knockout',
    desc: 'Group stage followed by a knockout bracket.'
  }
];