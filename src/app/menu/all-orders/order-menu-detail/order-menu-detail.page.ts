import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { orderMenu } from '../../orderMenu.model';
import { MenuService } from '../../menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-menu-detail',
  templateUrl: './order-menu-detail.page.html',
  styleUrls: ['./order-menu-detail.page.scss'],
})
export class OrderMenuDetailPage implements OnInit {
  
  orderm:orderMenu= new orderMenu();

  constructor(
    private firestoreService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.firestoreService.orderm);
    this.orderm = this.firestoreService.orderm;
  }

}
