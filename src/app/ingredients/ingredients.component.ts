import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Input() category: any;
  @Input() index: number;
  @Input() count: number = 1;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onChoose = new EventEmitter<any>();

  close() {
    this.onClose.emit(true);
  }

  chooseIngredient(item: any, index: number) {
    this.onChoose.emit({
      item: item,
      index: index
    });
  }

  constructor() { }

  ngOnInit() { }
}
