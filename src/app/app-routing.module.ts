import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './courses/course-list/course-list.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: NewCourseComponent },
  { path: 'courses/:id', component: NewCourseComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
