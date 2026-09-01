import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITeam } from '../../../shared/models/team.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CheckUserInTeamPipe } from '../../../shared/pipes/check-user-in-team-pipe';
import { IUser } from '../../../shared/models/user.model';
import { MembershipStatuses } from '../../../shared/enums/membership-statuses.enum';

@Component({
  selector: 'app-players',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CheckUserInTeamPipe
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  onSearch = output<string | null>();
  onInvite = output<string>();
  onDelete = output<string>();
  onApprove = output<string>();
  onReject = output<string>();

  user = input<IUser | null>(null);
  team = input<ITeam | null>(null);
  playersSuggestions = input<any[]>([]);

  membershipStatusesEnum = MembershipStatuses;

  search = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value: string | null) => {
        this.onSearch.emit(value);
      });
  }

}
