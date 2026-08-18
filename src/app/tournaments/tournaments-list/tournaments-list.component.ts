import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { TournamentTypes } from '../../shared/enums/tournament-types.enum';
import { TournamentStatusesEnum } from '../../shared/enums/tournament-statuses.enum';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { TournamentService } from '../../core/services/tournament.service';
import { ITournament, ITournamentQuery } from '../../shared/models/tournament.model';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, fromEvent, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { ModalCreateTournamentComponent } from '../../shared/components/modal-create-tournament/modal-create-tournament.component';
import { TOURNAMENT_TYPES } from '../../shared/consts/tournament-types.const';
import { HeaderMainComponent } from '../../shared/components/header-main/header-main.component';

@Component({
  selector: 'app-tournaments-list',
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    PaginationComponent,
    ButtonComponent,
    HeaderMainComponent
],
  templateUrl: './tournaments-list.component.html',
  styleUrl: './tournaments-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentsListComponent implements OnInit, AfterViewInit {

  @ViewChild('searchRef', {static: false}) searchRef!: ElementRef<HTMLInputElement>;

  tournamentService = inject(TournamentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef);

  tournamentTypesEnum = TournamentTypes;
  tournamentStatusesEnum = TournamentStatusesEnum;

  tournaments = signal<ITournament[]>([]);

  tournamentTypes = TOURNAMENT_TYPES;

  tournamentStatuses = [
    {
      value: TournamentStatusesEnum.DRAFT,
      label: 'Draft'
    },
    {
      value: TournamentStatusesEnum.ACTIVE,
      label: 'Active'
    },
    {
      value: TournamentStatusesEnum.FINISHED,
      label: 'Finished'
    }
  ];

  limit = signal<number>(15);
  page = signal<number>(1);
  totalPages = signal<number>(0);

  formatFilter = signal<TournamentTypes[]>([]);
  statusFilter = signal<string[]>([]);
  nameFilter = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((queryParams: Params) => {          
          if (queryParams['types']) {
            this.formatFilter.set(queryParams['types'].split(','));
          }
          if (queryParams['statuses']) {
            this.statusFilter.set(queryParams['statuses'].split(','));
          }

          queryParams['nameTournament'] ?
            this.nameFilter.setValue(queryParams['nameTournament']) :
            this.nameFilter.setValue(null);

          return this.tournamentService.getTournaments(
            {
              ...this.filtersToQueryParams(),
              limit: this.limit(),
              offset: 0
            }
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response: ITournamentQuery) => {
        this.tournaments.set(response.items);
        this.totalPages.set(Math.ceil(response.total / response.limit));
        this.limit.set(response.limit);
        this.page.set(response.offset / response.limit + 1);
      })
  }

  ngAfterViewInit(): void {

    this.nameFilter.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((name: string | null) => {
        this.setQueryParams({nameTournament: name});
      })
  }

  setFormatFilter(formats: TournamentTypes[]) {
    this.formatFilter.set(formats);

    if (this.formatFilter().length) {
      this.setQueryParams({types: this.formatFilter().join(',')});
    } else {
      this.setQueryParams({types: null});
    }
  }

  setStatusFilter(statuses: TournamentStatusesEnum[]) {
    this.statusFilter.set(statuses);
    
    if (this.statusFilter().length) {
      this.setQueryParams({statuses: this.statusFilter().join(',')});
    } else {
      this.setQueryParams({statuses: null});
    }
  }

  setPage(page: number) {
    this.page.set(page);
    this.getTournaments(this.filtersToQueryParams());
  }

  openCreateTournamentDialog() {
    const dialogRef = this.dialog.open(ModalCreateTournamentComponent, {
      maxWidth: '840px',
      width: '840px',
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: any) => {
        if (result) {
          this.tournamentService.createTournament(result)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response: ITournament) => {
              this.router.navigate(['/tournaments', response.id]);
            });
        }
      });
  }

  private getTournaments(params: any) {
    this.tournamentService.getTournaments(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: ITournamentQuery) => {
        this.tournaments.set(response.items);
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
      types: this.formatFilter().length ? this.formatFilter().join(',') : null,
      statuses: this.statusFilter().length ? this.statusFilter().join(',') : null,
      nameTournament: this.nameFilter.value ? this.nameFilter.value : null,
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
