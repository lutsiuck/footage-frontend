import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeaderPageComponent } from '../../shared/components/header-page/header-page.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TeamService } from '../../core/services/team.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITeam } from '../../shared/models/team.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-team',
  imports: [
    HeaderPageComponent,
    ButtonComponent
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit {
  
  teamService = inject(TeamService);
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
      label: 'Playres',
      value: 'players'
    },
    {
      label: 'Settings',
      value: 'settings'
    }
  ]);
  activeTab = signal('overview');
  team = signal<ITeam | null>(null);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: any) => this.teamService.getTeam(params.get('id')) || EMPTY),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: ITeam) => {
        this.team.set(res);
      });
  }

}
