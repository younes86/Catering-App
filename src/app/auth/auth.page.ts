import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({keyboardClose: true, message: 'Logging in ...'})
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        authObs = this.authService.login(email, password);
        authObs.subscribe(resData => {
          // console.log('my resData ' + resData);
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/menu/tabs/drinks');
        }, errRes => {
          console.log(errRes);
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message;
          if (code === 'EMAIL_NOT_FOUND') {
            message = 'E-Mail address could not be found';
          } else if ( code === 'This password is not correct.') {
            message = 'This password is not correct.';
          }
          this.showAlert(message);
        });
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
    .create({
      header: 'Authentication failed',
      message: message,
      buttons: ['Okay']
    })
    .then(alertEl => alertEl.present());
  }
}
