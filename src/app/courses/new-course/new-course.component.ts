import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICourse, isDate } from '@app/shared';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

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

  private _editMode: boolean = false;
  private _activeCourseId: number;
  private readonly _initialized: Subject<void> = new Subject<void>();
  private readonly _destroyed: Subject<void> = new Subject<void>();

  get formInvalid(): boolean {
    return this.courseForm.invalid;
  }

  get nameInvalid(): boolean {
    const control: AbstractControl = this.courseForm.get('name');

    return control.invalid && control.dirty;
  }
  get descriptionInvalid(): boolean {
    const control: AbstractControl = this.courseForm.get('description');

    return control.invalid && control.dirty;
  }
  get nameErrors(): string {
    const control: AbstractControl = this.courseForm.get('name');

    return Object.keys(control.errors).join(' ');
  }
  get descriptionErrors(): string {
    const control: AbstractControl = this.courseForm.get('description');

    return Object.keys(control.errors).join(' ');
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) {
    this.courseForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      date: new FormControl(null, [Validators.required, isDate]),
      duration: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this._destroyed),
        filter((params: ParamMap) => Boolean(params.get('id'))),
        switchMap(
          (params: ParamMap): Observable<ICourse> => {
            this._editMode = true;
            const courseId: number = Number(params.get('id'));
            this._activeCourseId = courseId;

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
    if (this._editMode) {
      this.coursesService.updateItem(this._activeCourseId, <ICourse>this.courseForm.value).subscribe(
        (course: ICourse): void => {
          this.router.navigate(['/courses']);
        }
      );
    } else {
      this.coursesService.createCourse(<ICourse>this.courseForm.value).subscribe(
        (course: ICourse): void => {
          this.router.navigate(['/courses']);
        }
      );
    }
  }
  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  private patchForm(course: ICourse): void {
    window.console.log(course);
    this.courseForm.patchValue({
      name: course.name,
      description: course.description,
      date: course.date,
      duration: course.duration
    });
    this.date = course.date;
    this.duration = course.duration;
  }
}
