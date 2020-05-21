import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Menu } from './menu.model';
import { AuthService } from '../auth/auth.service';
import { switchMap, take,tap,map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { orderMenu } from './orderMenu.model';

enum type {'meals'='meals','drinks'='drinks'}

interface MenuData {
  title: string;
  imageUrl: string;
  price: number;
  userId: string;
  qty: number;
}

@Injectable({
    providedIn: 'root'
})
export class MenuService{

  private _menuD = new BehaviorSubject<Menu[]>([]);
  private _menuStoreDrinks = <Menu[]>([]);


  private _menuM = new BehaviorSubject<Menu[]>([]);
  private _menuStoreMeals = <Menu[]>([]);

  private dataBoth = <Menu[]>([]);

  private state=0;

  public orderm:orderMenu= new orderMenu();

  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    public firestore: AngularFirestore) {}
  
  sendOrder(orderm:orderMenu): Promise<DocumentReference> {
  const id = this.firestore.createId();
    orderm.id =id;
    console.log(orderm.id);
    console.log(orderm);
    // let v = JSON.parse(JSON.stringify(orderm));
    // return this.firestore.doc(`orderMenu/${id}`).set({
    //   v
    // });
    return this.firestore.collection(`orderMenu`).add(JSON.parse(JSON.stringify(orderm)))
  }
  
  getAllOrders(): AngularFirestoreCollection<orderMenu> {
    return this.firestore.collection('orderMenu');
  }

  getOrderDetail(orderId: string): AngularFirestoreDocument<orderMenu> {
    return this.firestore.collection('orderMenu').doc(orderId);
  }
 
  get menusDrinks() {
    return this._menuD.asObservable();
  }

  get menusMeals() {
    return this._menuM.asObservable();
  }

  reset(){
    this.state=0;
  }

  incrementState(){
    this.state++;
  }

  getStatus(){
     return this.state;
  }

  menuStoreM() { 
    return this._menuStoreMeals;
  }

  menuStoreD() {
    return this._menuStoreDrinks
  }

  clearDataBoth() {
    return this.dataBoth= [];
  }

  clearMenuStoreM(){
    return this._menuM.next(null);
  }

  storeMeals() {
    this.menusMeals.subscribe(mealsData => {
      this._menuStoreMeals = mealsData;
      this._menuStoreMeals = this._menuStoreMeals.filter(e=> e.qty>0);
      // let ret =this._menuStoreMeals.some(e=>  e.qty > 0);
      // if(ret==false) {
      //   //  this.storeData('meals',[]);
      //   this.dataBoth =this._menuStoreMeals.concat(this._menuStoreDrinks);
      //    this.storeData('both', this.dataBoth );
      //    return;
      // }
      //  this._menuStoreMeals.forEach((element,index) => {
      //   if (element.qty >0 ) {
      //     this.data[index] = element;
      //    this.storeData('meals', this.data);
      //    }
      //  });
      // if(localStorage.getItem("both") === null) {
      //   this._menuStoreMeals = [];
      //   this._menuStoreDrinks = [];
      // }
      // this._menuStoreDrinks.map((e,index)=>e.oder=index)
      this.dataBoth =this._menuStoreMeals.concat(this._menuStoreDrinks);
      this.storeData('both', this.dataBoth );
    }).unsubscribe();
   }

   resetLocalStorage(){
    localStorage.removeItem('_cap_both');
    this._menuStoreMeals = [];
    this._menuStoreDrinks = [];
   }
   
   storeDrinks() {
    this.menusDrinks.subscribe(drinksData => {
      this._menuStoreDrinks = drinksData;
      this._menuStoreDrinks = this._menuStoreDrinks.filter(e=> e.qty>0);
      // if(localStorage.getItem("both") === null) {
      //   this._menuStoreMeals = [];
      //   this._menuStoreDrinks = [];
      // }
      // let ret =this._menuStoreDrinks.some(e=>  e.qty > 0);
      // if(ret==false) {
      //   //  this.storeData('drinks',[]);
      //   this.dataBoth =this._menuStoreMeals.concat(this._menuStoreDrinks)
      //    this.storeData('both', this.dataBoth);
      //    return;
      // }
      // console.log('my saved data is:', this._menuStoreDrinks);
      //  this._menuStoreDrinks.forEach((element,index) => {
      //   if (element.qty >0 ) {
      //     this.dataD[index] = element;
      //    this.storeData('drinks', this.dataD);
      //    }
      //  });
      this.dataBoth =this._menuStoreDrinks.concat(this._menuStoreMeals)
      this.storeData('both', this.dataBoth);
      console.log('storeDrinks saved:', this.dataBoth);
    }).unsubscribe();
   }

   storeData = (key: string, value: Array<Menu>) => {
    Plugins.Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  fetchMeals() {
    return this.http
      .get<{[key: string]: MenuData}>('https://catering-app-h.firebaseio.com/mymeals.json')
      .pipe(
        map( resData => {
          const meals = [];
          let quantity = 0;
          for ( const key in resData) {
            if (resData.hasOwnProperty(key)) {
              meals.push(
                new Menu(
                  key,
                  resData[key].title,
                  resData[key].imageUrl,
                  resData[key].price,
                  resData[key].userId,
                  quantity,
                  type.meals
                )
              );
            }
          }
          return meals;
        }),
        tap(meals => {
          this._menuM.next(meals);
        })
      );
  }

  addMeal(title: string, price: number) {
    let generatedId: string;
    let newMenu: Menu;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if(!userId) {
          throw new Error ('No user id found');
        }
        newMenu = new Menu(
          Math.random().toString(),
          title,
          'https://de.wikipedia.org/wiki/Hamburger#/media/Datei:Hamburger_(black_bg).jpg',
          price,
          userId,
          0,
          type.meals
        );
        return this.http.post<{name: string}>(
          'https://catering-app-h.firebaseio.com/mymeals.json',
          {...newMenu, id: null})
      }),
      switchMap(resData => {
        generatedId = resData.name;
        return  this._menuM;
    }),
      take(1),
      tap(places => {
        newMenu.id = generatedId;
        this._menuM.next(places.concat(newMenu));
      })
    );
  }

  fetchDrinks() {
    return this.http
      .get<{[key: string]: MenuData}>('https://catering-app-h.firebaseio.com/mydrinks.json')
      .pipe(
        map( resData => {
          const drinks = [];
          for ( const key in resData){
            if (resData.hasOwnProperty(key)) {
              drinks.push(
                new Menu(
                  key,
                  resData[key].title,
                  resData[key].imageUrl,
                  resData[key].price,
                  resData[key].userId,
                  resData[key].qty,
                  type.drinks
                )
              );
            }
          }
          return drinks;
        }),
        tap(drinks => {
          this._menuD.next(drinks);
        })
      );
  }

  addDrink(title: string, price: number) {
    let generatedId: string;
    let newMenu: Menu;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error ('No user id found');
        }
        newMenu = new Menu(
        Math.random().toString(),
        title,
        'https://de.wikipedia.org/wiki/Hamburger#/media/Datei:Hamburger_(black_bg).jpg',
        price,
        userId,
        0,
        type.drinks
      );
        return this.http.post<{name: string}>(
        'https://catering-app-h.firebaseio.com/mydrinks.json',
        {...newMenu, id: null})
    }),
      switchMap(resData => {
        generatedId = resData.name;
        return  this.menusDrinks;
    }),
      take(1),
      tap(places => {
        newMenu.id = generatedId;
        this._menuD.next(places.concat(newMenu));
      })
    );
  }
}