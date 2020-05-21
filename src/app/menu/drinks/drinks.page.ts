import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../menu.model';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
})
export class DrinksPage implements OnInit, OnDestroy {
  
  drinks: Menu[];
  private drinkssub: Subscription;

  drink = JSON.parse(localStorage.getItem('_cap_both'));

  constructor(private drinksService: MenuService) { }

  ngOnInit() {
    this.getMyDrinks();
  }

  getMyDrinks() {
    this.drinkssub = this.drinksService.fetchDrinks().subscribe( drinksData => {
      this.drinks = drinksData;
    })
  }

  ionViewDidEnter() {
    if (localStorage.getItem('_cap_both') === null ||  this.drinksService.getStatus() <2 ) {
      if(this.drinksService.getStatus() < 2) this.drinksService.incrementState();
      return this.getMyDrinks();
    } 
    else {
      this.drinksService.menuStoreD();
    }
  }

  ionViewWillLeave() {
    this.drinksService.storeDrinks();
  }

  ngOnDestroy() {
    if (this.drinkssub) {
      this.drinkssub.unsubscribe();
    }
  }

  onRest(value:number, i, slidingItem: IonItemSliding){
    slidingItem.close();
    return this.drinks[i].qty = 0;
  }
  
  decrementQty(value: number, i) {
    const initialvalue = 1;
    if (value > 0) {
      const changeValue = value - 1;
      return this.drinks[i].qty = changeValue;
    }
    else {
      return this.drinks[i].qty = initialvalue - 1;
    }
  
  }
  
  incrementQty(value: number, i) {
    const initialvalue = 0; 
    if (value != null) { 
        const changeValue = value + 1; 
        return (this.drinks[i].qty = changeValue); 
    } 
    else { 
        return (this.drinks[i].qty = initialvalue + 1); 
    } 
  }

}
