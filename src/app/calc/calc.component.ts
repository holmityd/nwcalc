import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import refining from 'data/refining.json';
import resources from 'data/resources.json';
import jewellery from 'data/jewellery.json';
import furnishing from 'data/furnishing.json';
import arcana from 'data/arcana.json';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  @Input() choosedItem: any;
  @Input() ingredients: any[];
  @Input() count: number = 1;

  // Data
  refining: any[] = refining;
  resources: any[] = resources;
  jewellery: any[] = jewellery.filter(item => item.category == 'Crafting Components');
  furnishing: any[] = furnishing.filter(item => item.category == 'Crafting Components');
  arcana: any[] = arcana.filter(item => item.category == 'Elemental Infusion');
  data: any[];
  constructor() {
    this.data = this.refining.concat(this.resources).concat(this.jewellery).concat(this.arcana).concat(this.furnishing);
  }

  // Close
  @Output() onClose = new EventEmitter<boolean>();
  close() {
    this.onClose.emit(true);
  }

  // Calc
  stages = [];
  private recursiveBlock = 0;
  private invertIngredients(arr: any[]) {
    this.recursiveBlock++;
    if (this.recursiveBlock > 100) return;
    let currentStage = [];
    let willContinue = false;
    arr.forEach(ingredient => {
      let item = this.data.filter(item => item.id.toLowerCase() == ingredient.id.toLowerCase()).pop();
      if (item ?.ingredients) {
        item.ingredients.forEach((b: any) => {
          let newIng = Object.assign({}, b);
          if (!newIng.id) {
            newIng = Object.assign({}, this.data.filter(dfe => dfe.id == newIng.subIngredients[0].id).pop());
          }
          newIng.quantity = 1;
          newIng.quantity = b.quantity * ingredient.quantity;
          let alreadyHave = currentStage.filter(c => c.id == newIng.id).pop();
          if (!alreadyHave) {
            currentStage.push(newIng);
          } else {
            alreadyHave.quantity += newIng.quantity;
          }
        });
      } else {
        let alreadyHave = currentStage.filter(c => c.id.toLowerCase() == ingredient.id.toLowerCase()).pop();
        if (!alreadyHave) {
          currentStage.push(ingredient);
        } else {
          alreadyHave.quantity += ingredient.quantity;
        }
      }
    });
    currentStage.forEach(ingredient => {
      if (this.refining.filter(item => item.id.toLowerCase() == ingredient.id.toLowerCase()).pop()) {
        willContinue = true;
      }
    });
    this.stages.push(currentStage);
    // this.reportLog(currentStage);
    if (willContinue)
      this.invertIngredients(currentStage);
  }
  ngOnInit() {
    this.stages.push(this.ingredients);
    this.invertIngredients(this.ingredients);
    this.stages = this.stages.slice().reverse();
    this.stages.forEach(item => this.reportLog(item));
  }

  // ScrollBooster
  @ViewChild('viewport', { read: ElementRef }) viewport!: ElementRef;
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;
  ngAfterViewInit() {
    new ScrollBooster({
      viewport: this.viewport.nativeElement,
      content: this.content.nativeElement,
      scrollMode: 'transform',
      emulateScroll: true
    });
  }

  // Debug
  private reportLog(obj: any): void {
    let text = '';
    obj.forEach((item: any) => {
      text += item.quantity + ' ' + item.name + ', ';
    });
    console.log(text);
  }
}
