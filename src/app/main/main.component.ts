import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuComponent } from '../shared/components/sidebar-menu/sidebar-menu.component';
import { AuthService } from '../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser } from '../shared/models/user.model';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    SidebarMenuComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.authService.getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: IUser) => {
        this.authService.currentUser.next(res);
      });
  }
}
