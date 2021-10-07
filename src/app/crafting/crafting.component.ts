import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.scss']
})
export class CraftingComponent implements OnInit {
  constructor() { }
  ingredients: any;
  choosedIngredients = [];
  calcIngredients: any;
  ingredientCategory: any;
  ingredientCategoryIndex: number;
  @Input('item') choosedItem: any;
  @Output() onClose = new EventEmitter<boolean>();

  close() {
    this.onClose.emit(true);
  }

  chooseIngredient(item: any, index: number) {
    if (item.type != 'category') return;
    this.ingredientCategory = item;
    this.ingredientCategoryIndex = index;
  }

  onChooseIngredient(event: any) {
    this.choosedIngredients[event.index] = event.item;
    this.ingredientCategory = null;
  }

  getGsMaxBonus() {
    let score = 0;
    this.choosedIngredients.forEach(item => {
      if (item.gsMaxBonus) score += item.gsMaxBonus;
    });
    return score;
  }
  getGsMinBonus() {
    let score = 0;
    this.choosedIngredients.forEach(item => {
      if (item.gsMinBonus) score += item.gsMinBonus;
    });
    return score;
  }

  // Count
  count: number = 1;
  changeCount(item: number) {
    this.count = item;
  }

  ngOnInit() {
    console.log(this.choosedItem);
    this.choosedItem.ingredients.forEach((item: any) => {
      if (item.type == 'category')
        this.choosedIngredients.push(item.subIngredients[0]);
      else this.choosedIngredients.push(item);
    });
  }
}
