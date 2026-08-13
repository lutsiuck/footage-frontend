import { Routes } from '@angular/router';
import { signedGuard } from './core/guards/signed.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.routes').then((r) => r.routes),
    canActivate: [signedGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
