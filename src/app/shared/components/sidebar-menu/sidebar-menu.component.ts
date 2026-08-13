import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  imports: [RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenuComponent {
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
    },
    {
      name: 'Logout',
      icon: 'logout',
      href: '/logout',
    }
  ]
}
