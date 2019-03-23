// tslint:disable:no-empty typedef
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() date: Date;
  @Output() controlBlur: EventEmitter<void> = new EventEmitter<void>();

  private _touched: boolean = false;

  writeValue(value): void {
    this.onChange(value);
  }

  onChange = value => {};
  onTouched = () => {};

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onDateChange(date: Date) {
    this.onChange(date);
  }

  onBlur() {
    if (!this._touched) {
      this.controlBlur.emit();
    }
    this._touched = true;
  }
}
