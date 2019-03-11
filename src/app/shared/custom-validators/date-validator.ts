import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isDate(): ValidatorFn {
  // tslint:disable-next-line:no-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isDateValue: boolean = control.value instanceof Date;

    return isDateValue ? { isNotDate: { value: control.value } } : null;
  };
}
