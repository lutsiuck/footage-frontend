import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tournaments',
  imports: [RouterOutlet],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentsComponent {}
