import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = 'Ivan Hrushevich';

  private _isLoggedIn: boolean;
  private readonly _subscriptions: Subscription[] = [];

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    this._subscriptions.push(
      this.authService.isAuthenticated.subscribe((value: boolean) => {
        this._isLoggedIn = value;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s: Subscription) => {
      s.unsubscribe();
    });
  }

  onLogOffClick(): void {
    this._subscriptions.push(
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/']);
      })
    );
  }
}
