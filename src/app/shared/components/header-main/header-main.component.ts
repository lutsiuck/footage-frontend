import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-main',
  imports: [
    RouterLink
  ],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.scss',
})
export class HeaderMainComponent {

  pageTitle = input<string>('');
}
