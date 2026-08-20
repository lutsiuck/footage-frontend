import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlInputComponent } from '../form-control-input/form-control-input.component';
import { ButtonComponent } from '../button/button.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-create-team',
  imports: [
    ReactiveFormsModule,
    FormControlInputComponent,
    ButtonComponent
  ],
  templateUrl: './modal-create-team.component.html',
  styleUrl: './modal-create-team.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCreateTeamComponent {
  dialogRef = inject(MatDialogRef<ModalCreateTeamComponent>);

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  formIsValid = signal<boolean>(true);

  submitForm() {
    if (this.teamForm.valid) {
      this.formIsValid.set(true);
      this.dialogRef.close(this.teamForm.value);
    } else {
      this.teamForm.markAllAsTouched();
      this.formIsValid.set(false);
    }
  }
}
