import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { AuthService } from './auth.service';
import * as fromAuth from './store/auth.reducer';

// tslint:disable-next-line: no-unsafe-any
@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly store: Store<fromAuth.State>
  ) {}

  canActivate(): Observable<boolean> {
    // return this.store.select('authenticated');
    return this.authService.isAuthenticated$;
  }
}
