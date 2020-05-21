import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        // console.log('isAuthenticated 1 : ' + isAuthenticated);
        if (!isAuthenticated) {
          return this.authService.autoLogin();
        } else {
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        // console.log('isAuthenticated 2 : ' + isAuthenticated);
        if (!isAuthenticated) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
