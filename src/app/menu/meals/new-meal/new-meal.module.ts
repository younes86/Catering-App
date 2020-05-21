import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMealPage } from './new-meal.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {
    path: '',
    component: NewMealPage
  }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewMealPage]
})
export class NewMealPageModule {}
