import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICourse } from '@app/shared';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { AuthService } from '@app/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCourseComponent implements OnInit, OnDestroy {
  courseForm: FormGroup;
  date: Date;
  duration: number;

  private readonly _initialized: Subject<void> = new Subject<void>();
  private readonly _destroyed: Subject<void> = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly coursesService: CoursesService
  ) {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      date: new FormControl(null, Validators.required),
      duration: new FormControl(null, [Validators.required, Validators.min(10)])
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this._destroyed),
        switchMap(
          (params: ParamMap): Observable<ICourse> => {
            const courseId: number = Number(params.get('id'));

            return this.coursesService.getItemById(courseId);
          }
        )
      )
      .subscribe((item: ICourse) => {
        this.patchForm(item);
      });
  }

  ngOnDestroy(): void {
    this._initialized.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }

  onSubmit(): void {
    //
  }
  onCancel(): void {
    //
  }

  onDateChanged(date: Date): void {
    this.courseForm.patchValue({ date: date });
  }
  onDurationChanged(duration: number): void {
    this.courseForm.patchValue({ duration: duration });
  }

  private patchForm(course: ICourse): void {
    window.console.log(course);
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      date: course.creationDate,
      duration: course.duration
    });
    this.date = course.creationDate;
    this.duration = course.duration;
  }
}
