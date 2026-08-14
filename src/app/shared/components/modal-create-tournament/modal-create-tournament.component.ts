import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControlInputComponent } from '../form-control-input/form-control-input.component';
import { ButtonComponent } from '../button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TournamentTypes } from '../../enums/tournament-types.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { TOURNAMENT_TYPES } from '../../consts/tournament-types.const';
import { InputDatepickerComponent } from '../input-datepicker/input-datepicker.component';
import moment from 'moment';

@Component({
  selector: 'app-modal-create-tournament',
  imports: [
    ReactiveFormsModule,
    FormControlInputComponent,
    ButtonComponent,
    InputDatepickerComponent
  ],
  templateUrl: './modal-create-tournament.component.html',
  styleUrl: './modal-create-tournament.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateTournamentComponent {

  dialogRef = inject(MatDialogRef<ModalCreateTournamentComponent>);

  tournamentTypesEnum = TournamentTypes;
  tournamentTypes = TOURNAMENT_TYPES;

  tournamentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', Validators.minLength(3)),
    type: new FormControl(this.tournamentTypesEnum.LEAGUE),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
  });

  formIsValid = signal<boolean>(true);

  changeDate(payload: any) {
    this.tournamentForm.patchValue(payload);
  }

  submitForm() {
    if (this.tournamentForm.value.start_date && this.tournamentForm.value.end_date) {
      const startDate = moment(this.tournamentForm.value.start_date, 'YYYY-MM-DD');
      const endDate = moment(this.tournamentForm.value.end_date, 'YYYY-MM-DD');
      
      if (startDate.isAfter(endDate)) {
        this.formIsValid.set(false);
        return;
      }
    }
    if (this.tournamentForm.valid) {
      this.formIsValid.set(true);
      this.dialogRef.close(this.tournamentForm.value);
    } else {
      this.tournamentForm.markAllAsTouched();
      // this.formIsValid.set(false);
    }
  }
}
