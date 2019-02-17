import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  // tslint:disable: no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('angularCoursesToken');

    if (!Boolean(token)) {
      return next.handle(req);
    } else {
      const authorizedRequest: HttpRequest<any> = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(authorizedRequest);
    }
  }
}
