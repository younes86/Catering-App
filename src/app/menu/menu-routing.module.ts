import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: MenuPage,
    children: [
      {
        path: 'drinks',
        children: [
          {
            path: '',
            loadChildren: './drinks/drinks.module#DrinksPageModule'
          },
          {
            path: 'new-drinks',
            loadChildren: './drinks/new-drinks/new-drinks.module#NewDrinksPageModule'
          }
        ]
      },
      {
        path: 'meals',
        children: [
          {
            path: '',
            loadChildren: './meals/meals.module#MealsPageModule'
          },
          {
            path: 'new-meals',
            loadChildren: './meals/new-meal/new-meal.module#NewMealPageModule'
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: './order/order.module#OrderPageModule'
          }
        ]
      },
      {
        path: 'allOrders',
        children: [
          {
            path: '',
            loadChildren: './all-orders/all-orders.module#AllOrdersPageModule'
          },
          {
            path: 'detail/:ordermenuId',
            loadChildren: './all-orders/order-menu-detail/order-menu-detail.module#OrderMenuDetailPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/menu/tabs/drinks',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/tabs/drinks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
