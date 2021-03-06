import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

import { ICourse } from '@app/shared';

import { ICoursesResponse } from '../courses-response.model';
import { CoursesService } from '../courses.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: ICourse[] = [];
  searchString$: Observable<string> = new Subject<string>().pipe(debounceTime(500));

  private loadMoreClickNumber: number = 0;
  private searchString: string;
  private readonly _subscriptions: Subscription[] = [];

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();

    this.searchString$.subscribe((searchString: string) => {
      this.searchString = searchString;
      this.getCoursesByString();
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s: Subscription) => {
      s.unsubscribe();
    });
  }

  getCourses(): void {
    this._subscriptions.push(
      this.coursesService.getList(this.loadMoreClickNumber * 5).subscribe((value: ICoursesResponse) => {
        this.updateCourseList(value.courses);
      })
    );
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
    this.loadMoreClickNumber = this.loadMoreClickNumber + 1;
    if (!Boolean(this.searchString)) {
      this.getCourses();
    } else {
      this.getCoursesByString();
    }
  }

  onAddCourseButtonClicked(): void {
    this.router.navigate(['/courses', 'new']);
  }

  private getCoursesByString(): void {
    this._subscriptions.push(
      this.coursesService
        .getListByName(this.loadMoreClickNumber * 5, this.searchString)
        .subscribe((value: ICoursesResponse) => {
          this.updateCourseList(value.courses);
        })
    );
  }

  private updateCourseList(courses: ICourse[]): void {
    this.courses = [];
    this.courses.push(...courses);
    this.changeDetectorRef.markForCheck();
  }

  private removeItem(courseId: number): void {
    this._subscriptions.push(
      this.coursesService
        .removeItem(courseId)
        .pipe(switchMap(() => this.coursesService.getList(this.loadMoreClickNumber * 5)))
        .subscribe((value: ICoursesResponse) => {
          this.courses = [];
          this.updateCourseList(value.courses);
        })
    );
  }
}
