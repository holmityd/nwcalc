import { Component, OnInit } from '@angular/core';
import data from '../data/data.json';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: any[] = data;
  categories: string[] = [];
  categoryName: string;
  choosedItem: any;

  changeCategory(item: string) {
    this.categoryName = item;
  }

  chooseItem(item: any) {
    this.choosedItem = item;
  }

  constructor() {}

  ngOnInit() {
    this.items.forEach(item => {
      if (this.categories.indexOf(item.category) == -1)
        this.categories.push(item.category);
    });
  }
}
