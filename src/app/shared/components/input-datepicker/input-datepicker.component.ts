import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import moment from 'moment';

@Component({
  selector: 'app-input-datepicker',
  imports: [
    MatDatepickerModule,
    MatMenuModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './input-datepicker.component.html',
  styleUrl: './input-datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDatepickerComponent {

  onChange = output<string>();

  placeholder = input<string>('');
  required = input<boolean>(false);
  label = input<string>('');
  className = input<string>('');
  errorMessage = input<string>('');
  value = input<string | null | undefined>(null);
  disabled = input<boolean>(false);

  dateValue = computed(() => this.value() ? moment(this.value()).format('DD-MM-YYYY') : null);


  changeDate(date: any) {
    this.onChange.emit(moment(date).format('YYYY-MM-DD'));
  }

}
