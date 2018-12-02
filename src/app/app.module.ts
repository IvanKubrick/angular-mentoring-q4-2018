import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';
import { CoursesModule } from './courses/courses.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './page/header/header.component';
import { FooterComponent } from './page/footer/footer.component';
import { SearchComponent } from './page/search/search.component';
import { BreadcrumbsComponent } from './page/header/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SearchComponent, BreadcrumbsComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, CoursesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
