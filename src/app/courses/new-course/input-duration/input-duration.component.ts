// tslint:disable:no-empty typedef
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-duration',
  templateUrl: './input-duration.component.html',
  styleUrls: ['./input-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDurationComponent),
      multi: true
    }
  ]
})
export class InputDurationComponent {
  @Input()
  set duration(value: number) {
    const time: number = Number(value);

    this._duration = time ? time : null;
  }
  get duration(): number {
    return this._duration;
  }

  private _duration: number;

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

  onInput(value: string) {
    const duration = +value ? +value : null;
    this.onChange(duration);
  }
}
