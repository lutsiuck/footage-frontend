import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {

  pageChange = output<number>();

  total = input<number>(0);
  limit = input<number>(15);
  page = input<number>(1);

  pages = computed<(number | string)[]>(() => {

    if (this.total() <= 5) {
      return Array.from({ length: this.total() }, (_, i) => i + 1);
    }

    if (this.page() >= this.total() - 4) {
      return [this.total() - 4, this.total() - 3, this.total() - 2, this.total() - 1, this.total()];
    }
    
    return this.page() <= 2 ? [1, 2, 3, '...', this.total()] : [this.page() - 1, this.page(), this.page() + 1, '...', this.total()];
  });
}
