import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core';
import { IAuthData } from '@app/shared';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(<IAuthData>this.loginForm.value).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }
}
