import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../menu.model';

@Component({
  selector: 'app-new-drinks-item',
  templateUrl: './new-drinks-item.component.html',
  styleUrls: ['./new-drinks-item.component.scss'],
})
export class NewDrinksItemComponent implements OnInit {

  @Input() drink : Menu;
  constructor() { }

  ngOnInit() {}

}
