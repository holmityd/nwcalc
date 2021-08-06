import { Component, OnInit } from '@angular/core';
import data from 'data/data.json';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: any[] = data;
  constructor() { }

  // Filter
  filterArgs = {
    category: '',
    name: ''
  }
  filterCategory(item: string): void {
    this.filterArgs = {
      category: item,
      name: this.filterArgs.name
    }
  }
  filterName(item: string): void {
    this.filterArgs = {
      category: this.filterArgs.category,
      name: item
    }
  }

  // Item
  choosedItem: any;
  chooseItem(item: any): void {
    this.choosedItem = item;
  }

  // Categories
  categories: string[] = [];
  ngOnInit() {
    this.items.forEach(item => {
      if (this.categories.indexOf(item.category) == -1)
        this.categories.push(item.category);
    });
  }
}
