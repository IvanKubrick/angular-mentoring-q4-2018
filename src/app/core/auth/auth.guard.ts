import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CoreModule } from '../core.module';
import { AuthService } from './auth.service';

// tslint:disable-next-line: no-unsafe-any
@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/unauthorized']);

    return false;
  }
}
