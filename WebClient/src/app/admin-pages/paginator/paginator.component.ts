import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent{
  @Input() currentPage!: number;  // обозначение текущей страницы
  @Input() maxPages!: number; // макисмаальное количество страниц
  @Input() maxCount!: number; // максимальное количество данных
  @Output() changePageEvent = new EventEmitter(); // обработчик событий по перелистыванию

  constructor(){}

  // создание массива для вывода данных
  createRange(range: number): any[] {
    const items = [];
    for (let i = 1; i <= range; i++) {
       items.push(i);
    }
    return items;
  }

  // событие изменение страницы
  change(value: number): any {
    this.changePageEvent.emit(value,);

    // изменение внешнего вида пагинатора.
    document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
    document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
    this.currentPage = value;
    document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
    document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
  }
}
