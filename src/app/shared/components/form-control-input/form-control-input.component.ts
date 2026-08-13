import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-control-input',
  imports: [],
  templateUrl: './form-control-input.component.html',
  styleUrl: './form-control-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormControlInputComponent,
    multi: true,
  }]
})
export class FormControlInputComponent implements ControlValueAccessor {
  type = input<string>('text');
  placeholder = input<string>('');
  required = input<boolean>(false);
  label = input<string>('');
  className = input<string>('');
  errorMessage = input<string>('');

  value = signal<string>('');
  disabled = signal<boolean>(false);

  protected onChange: (value: string | number | null) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: string | number | null): void {
    this.value.set(value === null || value === undefined ? '' : String(value));
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected handleInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.value.set(raw);

    if (this.type() === 'number') {
      if (raw.trim() === '') {
        this.onChange(null);
        return;
      }

      const parsed = Number(raw);
      this.onChange(Number.isNaN(parsed) ? null : parsed);
      return;
    }

    this.onChange(raw);
  }

}
