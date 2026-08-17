import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {

  authService = inject(AuthService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  menu = [
    {
      name: 'Home',
      icon: 'home',
      href: '/',
    },
    {
      name: 'Tournaments',
      icon: 'tournaments',
      href: '/tournaments',
    },
    {
      name: 'Matches',
      icon: 'matches',
      href: '/matches',
    },
    {
      name: 'Teams',
      icon: 'teams',
      href: '/teams',
    },
    {
      name: 'Players',
      icon: 'players',
      href: '/players',
    },
    {
      name: 'Videos',
      icon: 'videos',
      href: '/videos',
    },
    {
      name: 'Profile',
      icon: 'profile',
      href: '/profile',
    },
    {
      name: 'Settings',
      icon: 'settings',
      href: '/settings',
    }
  ]

  logout() {
    this.authService.logout()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.authService.setAuthData({accessToken: ''});
        this.router.navigate(['auth']);
      });
  }
}
