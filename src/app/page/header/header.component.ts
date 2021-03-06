import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { ICourse, IUser } from '@app/shared';

import { CoursesService } from 'src/app/courses/courses.service';
import { AppState, selectAuthUser } from 'src/app/store';
import * as AuthActions from '../../core/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  breadcrumb: string;
  loggedInUser: IUser;

  private readonly _subscriptions: Subscription[] = [];

  get userName(): string {
    return `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`;
  }

  constructor(
    private readonly coursesService: CoursesService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>,
    private readonly translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe((user: IUser) => {
      this.loggedInUser = user;
      this.changeDetectorRef.markForCheck();
    });
    this.subscribeForRouterEvents();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s: Subscription) => {
      s.unsubscribe();
    });
  }

  onLogOffClick(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  onLanguageChange(lang: string): void {
    this.translate.use(lang);
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
