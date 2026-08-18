import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITournament, ITournamentQuery } from '../../shared/models/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private http = inject(HttpClient);

  getTournaments(params: any) {
    return this.http.get<ITournamentQuery>('/tournaments', {params});
  }

  getTournament(tournamentId: string) {
    return this.http.get<ITournament>(`/tournaments/${tournamentId}`);
  }

  createTournament(tournament: ITournament) {
    return this.http.post<ITournament>('/tournaments', tournament);
  }

  updateTournament(tournamentId: string, payload: ITournament) {
    return this.http.patch<ITournament>(`/tournaments/${tournamentId}`, payload);
  }

  startTournament(tournamentId: string) {
    return this.http.patch<ITournament>(`/tournaments/${tournamentId}/start`, {});
  }

  finishTournament(tournamentId: string) {
    return this.http.patch<ITournament>(`/tournaments/${tournamentId}/finish`, {});
  }

  applyToTournament(tournamentId: string, teamId: string) {
    return this.http.post<ITournament>(`/tournaments/${tournamentId}/apply`, {team_id: teamId});
  }

  inviteToTournament(tournamentId: string, teamId: string) {
    return this.http.post<ITournament>(`/tournaments/${tournamentId}/invite`, {team_id: teamId});
  }

  approveToTournament(tournamentId: string, teamId: string) {
    return this.http.patch<ITournament>(`/tournaments/${tournamentId}/teams/${teamId}/approve`, {});
  }

  rejectToTournament(tournamentId: string, teamId: string) {
    return this.http.patch<ITournament>(`/tournaments/${tournamentId}/teams/${teamId}/reject`, {});
  }

  removeTeamFromTournament(tournamentId: string, teamId: string) {
    return this.http.delete<ITournament>(`/tournaments/${tournamentId}/teams/${teamId}`);
  }
}
