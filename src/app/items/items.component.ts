import { Component, OnInit } from '@angular/core';
import data from 'data/data.json';
import jewellery from 'data/jewellery.json';
import refining from 'data/refining.json';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: any[];
  constructor() {
    this.items = data.concat(refining).concat(jewellery);
  }

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

  getTier(icon: string): string {
    if (icon.slice(-2, -1) != 'T') return '';
    return icon.slice(-2);
  }
  // getTier(icon: string): string {
  //   if (icon.slice(-2, -1) != 'T') return '';
  //   switch (icon.slice(-1)) {
  //     case '1': return 'I';
  //     case '2': return 'II';
  //     case '3': return 'III';
  //     case '4': return 'IV';
  //     case '5': return 'V';
  //   }
  // }

  // Item
  choosedItem: any;
  chooseItem(item: any): void {
    this.choosedItem = item;
    // console.log(JSON.stringify(item));
  }

  // Categories
  categories: string[] = [];
  ngOnInit() {
    this.items.forEach(item => {
      if (this.categories.indexOf(item.category) == -1)
        this.categories.push(item.category);
    });
    // this.choosedItem = <any>{ "id": "TimberT5", "name": "Ironwood Planks", "rarity": 0, "icon": "timbert5", "itemType": "Resource", "ingredients": [{ "type": "item", "itemType": "Resource", "id": "WoodT5", "name": "Ironwood", "rarity": 0, "icon": "WoodT5", "quantity": 8 }, { "type": "item", "itemType": "Resource", "id": "TimberT4", "name": "Wyrdwood Planks", "rarity": 0, "icon": "TimberT4", "quantity": 2 }, { "type": "category", "name": "Sandpaper", "quantity": 1, "subIngredients": [{ "type": "item", "itemType": "Resource", "id": "SandpaperT3", "name": "Coarse Sandpaper", "rarity": 0, "icon": "SandpaperT3", "quantity": 1, "gsMaxBonus": 0, "gsMinBonus": 0 }, { "type": "item", "itemType": "Resource", "id": "SandpaperT4", "name": "Fine Sandpaper", "rarity": 1, "icon": "SandpaperT4", "quantity": 1, "gsMaxBonus": 0, "gsMinBonus": 0 }, { "type": "item", "itemType": "Resource", "id": "SandpaperT5", "name": "Obsidian Sandpaper", "rarity": 2, "icon": "SandpaperT5", "quantity": 1, "gsMaxBonus": 0, "gsMinBonus": 0 }] }], "tradeskill": "Woodworking", "recipeLevel": 150, "category": "Refined Resources", "stations": ["Woodshop Tier 5"], "event": { "CategoricalProgressionId": "Woodworking", "CategoricalProgressionReward": 770, "TerritoryStanding": 0 } };
  }
}
