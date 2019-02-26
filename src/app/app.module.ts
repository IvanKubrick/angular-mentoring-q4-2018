import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './courses/course-list/dialog/dialog.component';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';
import { FooterComponent } from './page/footer/footer.component';
import { BreadcrumbsComponent } from './page/header/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './page/header/header.component';
import { LoaderComponent } from './page/loader/loader.component';
import { LoaderInterceptorService } from './page/loader/loader.interceptor';
import { metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CoursesModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
