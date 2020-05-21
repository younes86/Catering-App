import { OnDestroy, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { Plugins } from '@capacitor/core';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public _userId = null;
  private _user = new BehaviorSubject<User>(null);

  // check ob the current User has a valid Token or not
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        // console.log("auth service user: " + JSON.stringify(user));
        if (user) {
          console.log('user 2  : ' , user );
          return !!user.token;
        } else {
          return false;
        }
       })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    })
    );
  }

  autoLogin() {
    return from(Plugins.Storage.get({key: 'authData'})).pipe(
      map(storedData => {
        if ( !storedData || !storedData.value) {
          return null;
        }
        // console.log('my stored Data' + storedData );
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationData: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationData);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }


  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
      environment.firebaseAPIKey
    }`, { email: email, password: password, returnSecureToken: true}
    )
    .pipe(
      tap((this.setUserData.bind(this)))
    );
  }

  logout() {
    this._user.next(null);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user =  new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    );
    this._user.next(user);
    console.log(user);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

  private storeAuthData(userId: string, token: string, tokenExpirationData: string, email: string) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationData: tokenExpirationData,
      email: email
    });
    Plugins.Storage.set({
      key: 'authData',
      value: data
    });
  }


  ngOnDestroy() {
  }
}
