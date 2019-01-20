import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';
import { FooterComponent } from './page/footer/footer.component';
import { BreadcrumbsComponent } from './page/header/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './page/header/header.component';
import { DialogComponent } from './shared/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, BreadcrumbsComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, CoursesModule, BrowserAnimationsModule, LoginModule],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
