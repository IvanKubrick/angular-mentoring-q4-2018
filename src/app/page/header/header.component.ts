import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { AuthService } from '@app/core';
import { ICourse, IUser } from '@app/shared';

import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  breadcrumb: string;
  loggedInUser: IUser;

  private _isLoggedIn: boolean;
  private readonly _subscriptions: Subscription[] = [];

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get userName(): string {
    return `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._subscriptions.push(
      this.authService.isAuthenticated$.subscribe((value: boolean) => {
        this._isLoggedIn = value;
        this.changeDetectorRef.markForCheck();
      }),
      this.authService.user.subscribe((value: IUser) => {
        this.loggedInUser = value;
        this.changeDetectorRef.markForCheck();
      })
    );
    this.subscribeForRouterEvents();
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

  private subscribeForRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd && event.url.indexOf('/courses') === 0),
        distinctUntilChanged(),
        map((event: NavigationEnd) => {
          return event.url
            .slice(1)
            .split('/')
            .slice(1)[0];
        }),
        switchMap((breadcrumb: string | undefined) => {
          if (breadcrumb === 'new') {
            return of('new');
          }

          return Boolean(breadcrumb) ? this.coursesService.getItemById(Number(breadcrumb)) : of(null);
        })
      )
      .subscribe(this.createBreadcrumbs);
  }

  private readonly createBreadcrumbs = (value: ICourse | 'new'): void => {
    if (value === 'new') {
      this.breadcrumb = 'new';
    } else if (Boolean(value) && Boolean(value.name)) {
      this.breadcrumb = value.name;
    } else {
      this.breadcrumb = '';
    }
    this.changeDetectorRef.markForCheck();
  };
}
