import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinksPage } from './drinks.page';
import { Routes, RouterModule } from '@angular/router';
import { NewDrinksItemComponent } from './new-drinks-item/new-drinks-item.component';

const routes: Routes = [
  {
    path: '',
    component: DrinksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DrinksPage, NewDrinksItemComponent]
})
export class DrinksPageModule {}
