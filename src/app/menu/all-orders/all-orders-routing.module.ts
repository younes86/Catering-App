import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllOrdersPage } from './all-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AllOrdersPage
  },
  {
    path: 'order-menu-detail',
    loadChildren: () => import('./order-menu-detail/order-menu-detail.module').then( m => m.OrderMenuDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOrdersPageRoutingModule {}
