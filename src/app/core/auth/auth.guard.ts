import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import { AppState } from './../../app.state';
import * as fromAuth from './store/auth.reducer';

// tslint:disable-next-line: no-unsafe-any
@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('auth'),
      map((auth: fromAuth.State) => auth.authenticated)
    );
  }
}
