import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { FilterByNamePipe, ICourse } from '@app/shared';
import { CoursesService } from '../courses.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: ICourse[];
  private fetchedCourses: ICourse[];
  private readonly _subscriptions: Subscription[] = [];

  constructor(
    private readonly filterByNamePipe: FilterByNamePipe,
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {}

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
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent);

    dialogRef
      .afterClosed()
      .pipe(filter((value: boolean) => value === true))
      .subscribe((result: boolean) => {
        this.removeItem(courseId);
      });
  }

  onCourseEditClicked(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  onLoadMoreButtonClick(): void {
    window.console.log('Load more');
  }

  onSearchButtonClicked(searchString: string): void {
    this.courses = this.filterByNamePipe.transform(this.fetchedCourses, searchString);
  }

  onAddCourseButtonClicked(): void {
    this.router.navigate(['/courses', 'new']);
  }

  private fetchCourses(courses: ICourse[]): void {
    this.fetchedCourses = courses;
    this.courses = courses;
    this.changeDetectorRef.markForCheck();
  }

  private removeItem(courseId: number): void {
    this._subscriptions.push(
      this.coursesService
        .removeItem(courseId)
        .pipe(switchMap(() => this.coursesService.getList()))
        .subscribe((courses: ICourse[]) => {
          this.fetchCourses(courses);
        })
    );
  }
}
