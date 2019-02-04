import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CoreModule } from '../core.module';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

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
