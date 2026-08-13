import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControlInputComponent } from '../../shared/components/form-control-input/form-control-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegister } from '../../shared/models/auth.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { confirmPasswordValidator } from '../../core/utils/validators.util';
import { switchMap } from 'rxjs';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormControlInputComponent,
    ButtonComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  authService = inject(AuthService);
  roter = inject(Router);
  destroyRef = inject(DestroyRef);

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    city: new FormControl(''),
    avatar_url: new FormControl(''),
    is_organizer: new FormControl(false),
  }, {
    validators: confirmPasswordValidator('password', 'confirmPassword')
  });

  register() {
    if (this.registrationForm.invalid) {
      return;
    }

    const payload = this.registrationForm.value;
    delete payload.confirmPassword;
    
    this.authService.register(payload as IRegister)
      .pipe(
        switchMap((response: {accessToken: string}) => {
          this.authService.setAuthData(response);
          return this.authService.getProfile();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res: IUser) => {
        this.authService.currentUser.next(res);
        this.roter.navigateByUrl('/');
      });
  }

  
}
