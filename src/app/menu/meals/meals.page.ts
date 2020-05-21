import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Menu } from '../menu.model';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu.service';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { CreatMealsComponentComponent } from './creat-meals-component/creat-meals-component.component';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})


export class MealsPage implements OnInit, OnDestroy {

  meals: Menu[];
  private menalssub: Subscription;

  constructor(
    private mealsService: MenuService,
    private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    this.getMyMeals();
  }

  getMyMeals() {
    this.menalssub = this.mealsService.fetchMeals().subscribe(mealsData => {
      this.meals = mealsData;
   });
  }

  openModal() {
    this.modalCtrl.create({
      component: CreatMealsComponentComponent,
      componentProps: {selectedMeal: this.meals}
    })
    .then(modalEl => {
      modalEl.present();
    })
  }

  ionViewDidEnter() {
    if (localStorage.getItem('_cap_both') === null ||  this.mealsService.getStatus() < 2) {
      if(this.mealsService.getStatus() < 2) this.mealsService.incrementState();
      return this.getMyMeals();
    } 
    else {
      this.mealsService.menuStoreM();
    }
  }

  ionViewWillLeave() {
    this.mealsService.storeMeals();
  }

  ngOnDestroy() {
    if (this.menalssub) {
      this.menalssub.unsubscribe();
    }
  }

  onReset(value: number, i, slidingItem: IonItemSliding){
    slidingItem.close();
    return this.meals[i].qty = 0;
  }

  decrementQty(value: number, i) {
    const initialvalue = 1;
    if (value > 0) {
      const changeValue = value - 1;
      this.meals[i].details.length=changeValue;
      console.log(this.meals[i]);
      return this.meals[i].qty = changeValue;
    } else {
      this.meals[i].details.length=initialvalue - 1;
      console.log(this.meals[i]);
      return this.meals[i].qty = initialvalue - 1;
    }
  }

  incrementQty(value: number, i) {
    const initialvalue = 0;
    if (value != null) {
        const changeValue = value + 1;
        this.meals[i].details.length=changeValue;
        console.log(this.meals[i]);
        return (this.meals[i].qty = changeValue);
    } else {
      this.meals[i].details.length=initialvalue + 1;
      console.log(this.meals[i]);
      return (this.meals[i].qty = initialvalue + 1);
    }
  }

  

}
