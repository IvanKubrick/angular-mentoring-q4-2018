import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '@app/core';
import { skipUntil, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCourseComponent implements OnInit {
  courseForm: FormGroup;
  duration: number;

  private readonly _initialized = new Subject<void>();
  private readonly _destroyed = new Subject<void>();

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      date: new FormControl(null, Validators.required),
      duration: new FormControl(null, [Validators.required, Validators.min(10)])
    });
  }

  ngOnInit(): void {
    this.courseForm
      .get('duration')
      .valueChanges.pipe(
        skipUntil(this._initialized),
        takeUntil(this._destroyed)
      )
      .subscribe((value: number) => {
        this.duration = value;
      });

    this._initialized.next();
  }

  ngOnDestroy() {
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
}
