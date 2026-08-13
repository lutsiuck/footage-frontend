import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  type = input<'submit' | 'button'>('submit');
  label = input<string>('');
  classType = input<string>('');
  icon = input<string>('');
  link = input<string>('');
  disabled = input<boolean>(false);

}
