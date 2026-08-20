import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { HeaderMainComponent } from '../../shared/components/header-main/header-main.component';
import { TeamService } from '../../core/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { ITeam, ITeamMembers, ITeamQuery } from '../../shared/models/team.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ModalCreateTeamComponent } from '../../shared/components/modal-create-team/modal-create-team.component';
import { IUser } from '../../shared/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { CheckUserInTeamPipe } from '../../shared/pipes/check-user-in-team-pipe';

@Component({
  selector: 'app-teams-list',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    CheckUserInTeamPipe,
    PaginationComponent,
    ButtonComponent,
    HeaderMainComponent
  ],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsListComponent implements OnInit {

  teamService = inject(TeamService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  route = inject(ActivatedRoute);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  teams = signal<ITeam[]>([]);
  user = signal<IUser | null>(null);

  limit = signal<number>(20);
  page = signal<number>(1);
  totalPages = signal<number>(0);

  nameFilter = new FormControl('');
  cityFilter = new FormControl('');

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: IUser | null) => {
        this.user.set(user);
      });
    this.route.queryParams
      .pipe(
        switchMap((queryParams: Params) => {
          this.nameFilter.setValue(queryParams['nameTeam'] || null);
          this.cityFilter.setValue(queryParams['city'] || null);
          return this.teamService.getTeams(
            {
              ...this.filtersToQueryParams(),
              limit: this.limit(),
              offset: 0
            }
          );;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response: ITeamQuery) => {
        this.teams.set(response.items);
        this.totalPages.set(Math.ceil(response.total / response.limit));
        this.limit.set(response.limit);
        this.page.set(response.offset / response.limit + 1);
      });

      this.nameFilter.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((name: string | null) => {
          this.setQueryParams({nameTeam: name});
        });

      this.cityFilter.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((name: string | null) => {
          this.setQueryParams({city: name});
        })
  }

  setPage(page: number) {
    this.page.set(page);
    this.getTeams(this.filtersToQueryParams());
  }

  openCreateTeamDialog() {
    const dialogRef = this.dialog.open(ModalCreateTeamComponent, {
      maxWidth: '840px',
      width: '840px',
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: any) => {
        if (res) {
          this.teamService.createTeam(res)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.getTeams(this.filtersToQueryParams());
            });
        }
      });
  }

  followTeam(teamId: string, members: ITeamMembers[]) {
    const isFollowed = members.some((member) => member.user.id === this.user()?.id);
    if (!isFollowed) {
      this.teamService.joinToTeam(teamId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.getTeams(this.filtersToQueryParams());
        });
    } else {
      this.teamService.leaveTeam(teamId, this.user()?.id!)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.getTeams(this.filtersToQueryParams());
        });
    }
  }

  private getTeams(params: any) {
    this.teamService.getTeams(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: ITeamQuery) => {
        this.teams.set(response.items);
        this.totalPages.set(Math.ceil(response.total / response.limit));
        this.limit.set(response.limit);
        this.page.set(response.offset / response.limit + 1);
    });
  }

  private setQueryParams(params: any) {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true
    })
  }

  private filtersToQueryParams() {
    const filters: any = {
      nameTeam: this.nameFilter.value ? this.nameFilter.value : null,
      city: this.cityFilter.value ? this.cityFilter.value : null,
      limit: this.limit(),
      offset: (this.page() - 1) * this.limit()
    };
    for (const filter in filters) {
      if (filters[filter] == null) {
        delete filters[filter];
      }
    }
    return filters;
  }

}
