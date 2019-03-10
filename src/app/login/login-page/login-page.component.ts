import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../core/auth/store/auth.actions';
import { AppState } from '../../store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private store: Store<AppState>) {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(new AuthActions.Login(this.loginForm.value));
    }
  }
}
