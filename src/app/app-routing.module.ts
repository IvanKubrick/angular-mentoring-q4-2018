import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './courses/course-list/course-list.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { NewCourseComponent } from './new-course/new-course/new-course.component';

const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'new-course', component: NewCourseComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
