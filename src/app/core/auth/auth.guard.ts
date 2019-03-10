import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthAuthenticated } from 'src/app/store';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAuthAuthenticated);
  }
}
