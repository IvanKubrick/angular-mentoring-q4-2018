import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core';
import { IAuthData, IUser } from '@app/shared';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(<IAuthData>this.loginForm.value).subscribe(
        (value: IUser) => {
          this.authService.user.next(value);
          localStorage.setItem('angularCoursesToken', value.token);
          this.router.navigate(['/courses']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/unauthorized']);
          } else {
            this.router.navigate(['/error']);
          }
        }
      );
    }
  }
}
