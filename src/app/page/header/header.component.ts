import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@app/core';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = 'Ivan Hrushevich';
  breadcrumbs: string[];

  private _isLoggedIn: boolean;
  private readonly _subscriptions: Subscription[] = [];

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._subscriptions.push(
      this.authService.isAuthenticated$.subscribe((value: boolean) => {
        this._isLoggedIn = value;
        this.changeDetectorRef.markForCheck();
      })
    );

    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd && event.url.indexOf('/courses') === 0),
        distinctUntilChanged()
      )
      .subscribe(
        (event: NavigationEnd): void => {
          this.createBreadCrumbs(event.url);
        }
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
        this.router.navigate(['/login']);
      })
    );
  }

  private createBreadCrumbs(url: string): void {
    this.breadcrumbs = url.slice(1).split('/');
    this.changeDetectorRef.markForCheck();
  }
}
