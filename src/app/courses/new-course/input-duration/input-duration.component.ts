import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

  @Input()
  set duration(value: number) {
    const time: number = Number(value);

    this._duration = time ? time : null;
  }
  get duration(): number {
    return this._duration;
  }

  @Output() durationChanged: EventEmitter<number> = new EventEmitter<number>();

  private readonly _initialized: Subject<void> = new Subject<void>();
  private readonly _destroyed: Subject<void> = new Subject<void>();
  private _duration: number;

  constructor() {
    this.durationForm = new FormGroup({
      duration: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
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
