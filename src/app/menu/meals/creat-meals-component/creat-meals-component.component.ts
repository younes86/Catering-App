import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../menu.model';

@Component({
  selector: 'app-creat-meals-component',
  templateUrl: './creat-meals-component.component.html',
  styleUrls: ['./creat-meals-component.component.scss'],
})
export class CreatMealsComponentComponent implements OnInit {

  @Input() selectedMeal: Menu;
  constructor() { }

  ngOnInit() {}

}
