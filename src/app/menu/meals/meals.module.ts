import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { Routes, RouterModule } from '@angular/router';
import { MealItemComponent } from './meal-item/meal-item.component';
import { CreatMealsComponentComponent } from './creat-meals-component/creat-meals-component.component';

const routes: Routes = [
  {
    path: '',
    component: MealsPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MealsPage, MealItemComponent, CreatMealsComponentComponent],
  entryComponents: [CreatMealsComponentComponent]
})
export class MealsPageModule {}
