import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControlInputComponent } from '../../shared/components/form-control-input/form-control-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormControlInputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authService = inject(AuthService);
  roter = inject(Router);
  destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value as { email: string; password: string })
      .pipe(
        switchMap((response: {accessToken: string}) => {
          this.authService.setAuthData(response);
          return this.authService.getProfile();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: IUser) => {
        this.authService.currentUser.next(res);
        this.roter.navigate(['/']);
      });
  }
}
