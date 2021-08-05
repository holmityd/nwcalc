import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import refining from '../data/refining.json';
import resources from '../data/resources.json';
import ScrollBooster from 'scrollbooster';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  @Input() ingredients: any;
  @Output() onClose = new EventEmitter<boolean>();
  refining: any[] = refining;
  resources: any[] = resources;
  data: any[];

  close() {
    this.onClose.emit(true);
  }

  constructor() {
    this.data = this.refining.concat(this.resources);
  }

  recursiveBlock = 0;
  stages = [];
  recursiveSearch(arr: any[]) {
    this.recursiveBlock++;
    if (this.recursiveBlock > 100) return;
    let currentStage = [];
    let willContinue = false;
    arr.forEach(ingredient => {
      let item = this.data.filter(item => item.id == ingredient.id).pop();
      if (item ?.ingredients) {
        item ?.ingredients.forEach(b => {
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
        let alreadyHave = currentStage.filter(c => c.id == ingredient.id).pop();
        if (!alreadyHave) {
          currentStage.push(ingredient);
        } else {
          alreadyHave.quantity += ingredient.quantity;
        }
      }
    });
    currentStage.forEach(ingredient => {
      if (this.refining.filter(item => item.id == ingredient.id).pop()) {
        willContinue = true;
      }
    });
    this.stages.push(currentStage);
    // this.reportLog(currentStage);
    if (willContinue)
      this.recursiveSearch(currentStage);
  }

  ngOnInit() {
    this.stages.push(this.ingredients);
    this.recursiveSearch(this.ingredients);
    // console.log('FINALOCHKA: ',this.stages);
    // this.stages.forEach(item=>{
    //   this.reportLog(item);
    // });
  }

  @ViewChild('viewport', { read: ElementRef }) viewport!: ElementRef;
  @ViewChild('content', { read: ElementRef }) content!: ElementRef;
  ngAfterViewInit() {
    new ScrollBooster({
      viewport: this.viewport.nativeElement,
      content: this.content.nativeElement,
      scrollMode: 'transform', // use CSS 'transform' property
      // direction: 'horizontal', // allow only horizontal scrolling
      emulateScroll: true, // scroll on wheel events
    });
  }

  reportLog(item: any) {
    let texta = '';
    item.forEach(a => {
      texta += a.quantity + ' ' + a.name + ', ';
    });
    console.log(texta);
  }
}
