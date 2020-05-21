import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';
import { orderMenu } from '../orderMenu.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.page.html',
  styleUrls: ['./all-orders.page.scss'],
})
export class AllOrdersPage implements OnInit {
  
  ordersList;
  num=-1;

  constructor(
    private firestoreServie: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ordersList = this.firestoreServie.getAllOrders().valueChanges();
    console.log(this.ordersList);
  }

  showDetail(i) {
     this.num = i;
  }
  reset() {
    this.num= -1;
  }
  // showDetail(orderListId: orderMenu) {
  //    this.firestoreServie.orderm‚ = orderListId;
  //   this.router.navigate(['/', 'menu', 'tabs', 'allOrders' , 'detail', orderListId.id ]);
  // }

}
