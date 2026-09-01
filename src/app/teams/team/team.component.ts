import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeaderPageComponent } from '../../shared/components/header-page/header-page.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TeamService } from '../../core/services/team.service';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../../shared/models/team.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';
import { PlayersComponent } from './players/players.component';
import { IPlayer, IUser } from '../../shared/models/user.model';
import { CheckUserInTeamPipe } from '../../shared/pipes/check-user-in-team-pipe';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-team',
  imports: [
    CheckUserInTeamPipe,
    HeaderPageComponent,
    ButtonComponent,
    PlayersComponent
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit {
  
  teamService = inject(TeamService);
  authService = inject(AuthService);
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
      label: 'Players',
      value: 'players'
    },
    {
      label: 'Settings',
      value: 'settings'
    }
  ]);
  activeTab = signal('overview');
  team = signal<ITeam | null>(null);
  playersSuggestions = signal<IPlayer[]>([]);

  user = signal<IUser | null>(null);

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: IUser | null) => {
        this.user.set(user);
      });
    
    this.route.paramMap
      .pipe(
        switchMap((params: any) => this.teamService.getTeam(params.get('id')) || EMPTY),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: ITeam) => {
        this.team.set(res);
      });
  }

  searchPlayers(value: string | null) {
    if (value && value?.length > 2) {
      this.teamService.searchPlayers(this.team()?.id!, value)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((res: IPlayer[]) => {
          this.playersSuggestions.set(res);
        });
    } else {
      this.playersSuggestions.set([]);
    }
  }

  inviteToTeam(userId: string) {
    this.teamService.inviteToTeam(this.team()?.id!, userId)
      .pipe(
        switchMap(() => this.teamService.getTeam(this.team()?.id!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: ITeam) => this.team.set(res));
  }

  deletePlayer(userId: string) {
    this.teamService.leaveTeam(this.team()?.id!, userId)
      .pipe(
        switchMap(() => this.teamService.getTeam(this.team()?.id!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: ITeam) => this.team.set(res));
  }

  approvePlayer(userId: string) {
    this.teamService.approveToTeam(this.team()?.id!, userId)
      .pipe(
        switchMap(() => this.teamService.getTeam(this.team()?.id!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: ITeam) => this.team.set(res));
  }

  rejectPlayer(userId: string) {
    this.teamService.rejectToTeam(this.team()?.id!, userId)
      .pipe(
        switchMap(() => this.teamService.getTeam(this.team()?.id!)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: ITeam) => this.team.set(res));
  }

}
