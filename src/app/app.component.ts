import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from './core/auth/auth.service';
import { LoaderService } from './page/loader/loader.service';
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
    const token: string | null = this.authService.getToken();

    if (token !== null) {
      this.authService.getUserInfo(token).subscribe(
        (value: IUserInfo) => {
          this.authService.authenticate();
          this.authService.revealUserData(value.fakeToken, value.name.first, value.name.last);
          this.router.navigate(['/courses']);
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['/unauthorized']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
