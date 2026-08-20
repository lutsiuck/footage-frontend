import { Routes } from "@angular/router";
import { TeamComponent } from "./team/team.component";
import { TeamsListComponent } from "./teams-list/teams-list.component";
import { TeamsComponent } from "./teams.component";

export const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children:[
      {
        path: '',
        component: TeamsListComponent
      },
      {
        path: ':id',
        component: TeamComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
]