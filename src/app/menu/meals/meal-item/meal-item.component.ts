import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../menu.model';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})
export class MealItemComponent implements OnInit {

  @Input() meal: Menu;

  constructor() { }

  ngOnInit() {}

  decrementQty(index: number) {

  }

  incrementQty() {

  }

}
