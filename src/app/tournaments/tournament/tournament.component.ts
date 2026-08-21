import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeaderPageComponent } from '../../shared/components/header-page/header-page.component';
import { ITournament } from '../../shared/models/tournament.model';
import { TournamentService } from '../../core/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamService } from '../../core/services/team.service';
import { ITeam, ITeamQuery } from '../../shared/models/team.model';

@Component({
  selector: 'app-tournament',
  imports: [
    DatePipe,
    HeaderPageComponent,
    ButtonComponent,
    TeamsComponent
  ],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentComponent implements OnInit{

  tournamentService = inject(TournamentService);
  teamsService = inject(TeamService);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);

  tabsMenu = signal([
    {
      label: 'Overview',
      value: 'overview'
    },
    {
      label: 'Matches',
      value: 'matches'
    },
    {
      label: 'Table',
      value: 'table'
    },
    {
      label: 'Teams',
      value: 'teams'
    },
    {
      label: 'Settings',
      value: 'settings'
    }
  ]);
  activeTab = signal('overview');
  tournament = signal<ITournament | null>(null);
  teamsSuggestions = signal<ITeam[]>([]);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: any) => this.tournamentService.getTournament(params.get('id')) || EMPTY),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((tournament: ITournament) => this.tournament.set(tournament));
  }

  searchTeams(value: string | null) {
    if (value && value.length > 2) {
      this.teamsService.getTeams({search: value})
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((res: ITeamQuery) => {
          this.teamsSuggestions.set(res.items);
        });
    } else {
      this.teamsSuggestions.set([]);
    }
  }

  inviteToTournament(teamId: string) {
    this.tournamentService.inviteToTournament(this.tournament()?.id!, teamId)
      .pipe(
        switchMap(() => this.tournamentService.getTournament(this.tournament()?.id!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((tournament: ITournament) => this.tournament.set(tournament));
  }

  deleteTeam(teamId: string) {
    this.tournamentService.removeTeamFromTournament(this.tournament()?.id!, teamId)
      .pipe(
        switchMap(() => this.tournamentService.getTournament(this.tournament()?.id!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((tournament: ITournament) => this.tournament.set(tournament));
  }
}
