import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

import { AuthService } from '@app/core';
import { ICourse } from '@app/shared';

import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = 'Ivan Hrushevich';
  breadcrumb: string;

  private _isLoggedIn: boolean;
  private readonly _subscriptions: Subscription[] = [];

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
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
      })
    );

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

          return breadcrumb ? this.coursesService.getItemById(Number(breadcrumb)) : of(null);
        })
      )
      .subscribe((value: ICourse | 'new') => {
        if (value === 'new') {
          this.breadcrumb = 'new';
        } else if (value && value.title) {
          this.breadcrumb = value.title;
        } else {
          this.breadcrumb = '';
        }
        this.changeDetectorRef.markForCheck();
      });
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
}
