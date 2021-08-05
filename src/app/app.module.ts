import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { CraftingComponent } from './crafting/crafting.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CalcComponent } from './calc/calc.component';

import { CategoryFilterPipe } from './category-filter.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    ItemsComponent,
    CraftingComponent,
    IngredientsComponent,
    CalcComponent,
    CategoryFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
