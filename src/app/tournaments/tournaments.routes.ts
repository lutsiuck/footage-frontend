import { Routes } from "@angular/router";
import { TournamentComponent } from "./tournament/tournament.component";
import { TournamentsListComponent } from "./tournaments-list/tournaments-list.component";
import { TournamentsComponent } from "./tournaments.component";

export const routes: Routes = [
  {
    path: '',
    component: TournamentsComponent,
    children:[
      {
        path: '',
        component: TournamentsListComponent
      },
      {
        path: ':id',
        component: TournamentComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
]