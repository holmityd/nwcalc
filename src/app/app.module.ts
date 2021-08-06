import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { CraftingComponent } from './crafting/crafting.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CalcComponent } from './calc/calc.component';

import { ItemFilterPipe } from './item-filter.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production,
    // Register the ServiceWorker as soon as the app is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  })],
  declarations: [
    AppComponent,
    ItemsComponent,
    CraftingComponent,
    IngredientsComponent,
    CalcComponent,
    ItemFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
