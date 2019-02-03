import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { skipUntil, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-duration',
  templateUrl: './input-duration.component.html',
  styleUrls: ['./input-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDurationComponent implements OnInit, OnDestroy {
  durationForm: FormGroup;
  duration: number;

  @Output() durationChanged: EventEmitter<number> = new EventEmitter<number>();

  private readonly _initialized: Subject<void> = new Subject<void>();
  private readonly _destroyed: Subject<void> = new Subject<void>();

  constructor() {
    this.durationForm = new FormGroup({
      duration: new FormControl(null, [Validators.required, Validators.min(10)])
    });
  }

  ngOnInit(): void {
    this.durationForm
      .get('duration')
      .valueChanges.pipe(
        skipUntil(this._initialized),
        takeUntil(this._destroyed)
      )
      .subscribe((value: number) => {
        this.duration = value;
        this.durationChanged.emit(value);
      });

    this._initialized.next();
  }

  ngOnDestroy(): void {
    this._initialized.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
}
