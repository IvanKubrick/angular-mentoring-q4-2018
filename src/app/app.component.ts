import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth/auth.service';
import { IUserInfo } from './userInfo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  ngOnInit(): void {
    const token: string = localStorage.getItem('angularCoursesToken');

    debugger;
    if (token !== null) {
      this.getUserInfo(token);
    } else {
      this.router.navigate(['/login']);
    }
  }

  private getUserInfo(token: string): void {
    this.authService.getUserInfo(token).subscribe(
      (value: IUserInfo) => {
        this.router.navigate(['/courses']);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/unauthorized']);
      }
    );
  }
}
