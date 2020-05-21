import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { MenuService } from '../../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})
export class NewMealPage implements OnInit {

  form: FormGroup;
  constructor(
    private loaderCtrl: LoadingController,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      })
    });
  }

  onCreate(){
    if (!this.form.valid) {
      return
    }
    this.loaderCtrl.create({
      message: 'Creating meal...'
    }).then(loadingEl =>{
      loadingEl.present();
      this.menuService.addMeal(
        this.form.value.title,
        +this.form.value.price
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/menu/tabs/meals']);
      })
    })
  }

}
