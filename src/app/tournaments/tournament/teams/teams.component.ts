import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, input, output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ITeam } from '../../../shared/models/team.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ITournament } from '../../../shared/models/tournament.model';

@Component({
  selector: 'app-teams',
  imports: [
    ReactiveFormsModule,
    ButtonComponent
],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsComponent implements OnInit{
  
  destroyRef = inject(DestroyRef);

  onSearch = output<string | null>();
  onInvite = output<string>();
  onDelete = output<string>();

  tournament = input<ITournament | null>(null);
  teamsSuggestions = input<ITeam[]>([]);

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
