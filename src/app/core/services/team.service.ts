import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITeam, ITeamQuery } from '../../shared/models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  http = inject(HttpClient);

  getTeams(params: any) {
    return this.http.get<ITeamQuery>('/teams', {params});
  }

  getTeam(teamId: string) {
    return this.http.get<ITeam>(`/teams/${teamId}`);
  }

  createTeam(team: ITeam) {
    return this.http.post<ITeam>('/teams', team);
  }

  updateTeam(teamId: string, payload: any) {
    return this.http.patch<ITeam>(`/teams/${teamId}`, payload);
  }

}
