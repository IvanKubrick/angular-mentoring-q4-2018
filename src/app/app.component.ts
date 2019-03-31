import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './core/auth/store/auth.actions';
import { AppState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.TryToLogin());
  }
}
