import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { LoaderService } from '../page/loader/loader.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, LoaderService],
  imports: [CommonModule]
})
export class CoreModule {}
