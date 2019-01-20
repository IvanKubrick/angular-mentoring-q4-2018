import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FilterByNamePipe, ICourse } from '@app/shared';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: ICourse[];
  private fetchedCourses: ICourse[];
  private readonly _subscriptions: Subscription[] = [];

  constructor(private readonly filterByNamePipe: FilterByNamePipe, private readonly coursesService: CoursesService) {}

  ngOnInit(): void {
    this._subscriptions.push(
      this.coursesService.getList().subscribe((courses: ICourse[]) => {
        this.fetchCourses(courses);
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s: Subscription) => {
      s.unsubscribe();
    });
  }

  onCourseDeleted(courseId: number): void {
    this._subscriptions.push(
      this.coursesService.removeItem(courseId).subscribe(() => {
        this.coursesService.getList().subscribe((courses: ICourse[]) => {
          this.fetchCourses(courses);
        });
      })
    );
  }

  onLoadMoreButtonClick(): void {
    window.console.log('Load more');
  }

  onSearchButtonClicked(searchString: string): void {
    this.courses = this.filterByNamePipe.transform(this.fetchedCourses, searchString);
  }

  private fetchCourses(courses: ICourse[]): void {
    this.fetchedCourses = courses;
    this.courses = courses;
  }
}
