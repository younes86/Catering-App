import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrinksPage } from './drinks.page';

const routes: Routes = [
  {
    path: '',
    component: DrinksPage
  },  {
    path: 'new-drinks',
    loadChildren: () => import('./new-drinks/new-drinks.module').then( m => m.NewDrinksPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrinksPageRoutingModule {}
