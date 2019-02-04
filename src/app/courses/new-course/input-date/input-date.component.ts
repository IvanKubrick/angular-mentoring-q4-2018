import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { skipUntil, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDateComponent implements OnInit, OnDestroy {
  dateForm: FormGroup;

  @Input() date: Date;

  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  private readonly _initialized: Subject<void> = new Subject<void>();
  private readonly _destroyed: Subject<void> = new Subject<void>();

  constructor() {
    this.dateForm = new FormGroup({
      date: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.dateForm
      .get('date')
      .valueChanges.pipe(
        skipUntil(this._initialized),
        takeUntil(this._destroyed)
      )
      .subscribe((value: Date) => {
        this.dateChanged.emit(value);
      });

    this._initialized.next();
  }

  ngOnDestroy(): void {
    this._initialized.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
}
