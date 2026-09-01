import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ITeam, ITeamQuery } from '../../shared/models/team.model';
import { IPlayer } from '../../shared/models/user.model';

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

  inviteToTeam(teamId: string, userId: string) {
    return this.http.post<{success: boolean}>(`/teams/${teamId}/invite`, {user_id: userId});
  }

  approveToTeam(teamId: string, userId: string) {
    return this.http.patch<{success: boolean}>(`/teams/${teamId}/members/${userId}/approve`, {});
  }

  rejectToTeam(teamId: string, userId: string) {
    return this.http.patch<{success: boolean}>(`/teams/${teamId}/members/${userId}/reject`, {});
  }

  joinToTeam(teamId: string) {
    return this.http.post<{success: boolean}>(`/teams/${teamId}/join`, {});
  }

  leaveTeam(teamId: string, userId: string) {
    return this.http.delete<{success: boolean}>(`/teams/${teamId}/members/${userId}`);
  }

  searchPlayers(teamId: string, value: string) {
    return this.http.get<IPlayer[]>(`/teams/${teamId}/search-players`, {params: {name: value}});
  }

}
