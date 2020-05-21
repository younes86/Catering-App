import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { orderMenu } from '../orderMenu.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orderMeal: Menu[];
  form: FormGroup;
  isFull : boolean


  constructor(
    private mealsService: MenuService,
    private alertCtrl: AlertController,
    private fireStore: AngularFirestore,
    public firestoreService: MenuService,
    private router: Router,
    formBuilder: FormBuilder
    ){
      this.form = formBuilder.group({
        tishNumber: ['',Validators.required],
      })
     }

  async createOrder(ordermenu:orderMenu){
    const loading = await this.alertCtrl.create();
    this.firestoreService.sendOrder(ordermenu)
        .then(
          (idRef) => {
            ordermenu.id = idRef.id;
            idRef.set(Object.assign({}, ordermenu));
            console.log("Document successfully written!");
            loading.dismiss().then(()=> {
              // this.router.navigateByUrl('');
            });
          },
          error => {
            console.error(error);
            console.log("Error writting document: ", error);
          }
        );
    return await loading.present();
  }   

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('_cap_both'))) {
      this.isFull = true;
    }
  }
  
  ionViewDidEnter() {
    this.getStoredData();
  }

   getStoredData() {
    this.orderMeal = JSON.parse(localStorage.getItem('_cap_both'));
    if( this.orderMeal.length > 0 ){
      this.isFull= false;
    }
    
  }

  clearStoredData() {
    this.isFull= true;
    this.createOrder(new orderMenu('',this.orderMeal,this.form.value.tishNumber,new Date()));
    this.mealsService.reset();
    this.mealsService.resetLocalStorage();
    this.orderMeal=[];
    this.mealsService.clearDataBoth();
    this.form.reset();
  }


}
