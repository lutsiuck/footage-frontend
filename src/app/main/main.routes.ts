import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { FeedComponent } from "../feed/feed.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: FeedComponent
      },
      {
        path: 'tournaments',
        loadChildren: () => import('../tournaments/tournaments.routes').then(m => m.routes)
      },
      {
        path: 'teams',
        loadChildren: () => import('../teams/teams.routes').then(m => m.routes)
      }
    ]
  }
]