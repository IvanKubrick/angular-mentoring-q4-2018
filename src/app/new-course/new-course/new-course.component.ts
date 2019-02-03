import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCourseComponent {
  courseForm: FormGroup;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      date: new FormControl(null, Validators.required),
      duration: new FormControl(null, [Validators.required, Validators.min(10)])
    });
  }

  onSubmit(): void {
    //
    console.log(this.courseForm.value);
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
}
