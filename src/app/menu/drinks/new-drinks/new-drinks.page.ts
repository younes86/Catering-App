import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { MenuService } from '../../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-drinks',
  templateUrl: './new-drinks.page.html',
  styleUrls: ['./new-drinks.page.scss'],
})
export class NewDrinksPage implements OnInit {

  form: FormGroup;
  constructor(
    private loaderCtrl: LoadingController,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur'
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
    message: 'Creating drink'
  }).then(loadingEl => {
    loadingEl.present();
    this.menuService.addDrink(
      this.form.value.title,
      +this.form.value.price
    ).subscribe(() => {
      loadingEl.dismiss();
      this.form.reset();
      this.router.navigate(['/menu/tabs/drinks']);
    })
  })
}
}