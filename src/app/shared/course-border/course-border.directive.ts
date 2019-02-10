import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseBorder]'
})
export class CourseBorderDirective implements OnInit {
  // tslint:disable-next-line: no-unsafe-any
  @Input('appCourseBorder')
  get borderColor(): string {
    return this._borderColor;
  }
  set borderColor(value: string) {
    const date: number = Number(new Date(value));
    const currentDate: number = Date.now();
    const twoWeeks: number = 1000 * 60 * 60 * 24 * 14;
    const dateTwoWeeksAgo: number = currentDate - twoWeeks;

    if (date < currentDate && date >= dateTwoWeeksAgo) {
      this._borderColor = 'forestgreen';
    } else if (date > currentDate) {
      this._borderColor = 'skyblue';
    }
  }

  private _borderColor: string;

  constructor(private readonly el: ElementRef) {}

  ngOnInit(): void {
    if (Boolean(this.borderColor)) {
      (<HTMLDivElement>this.el.nativeElement).style.border = `3px solid ${this.borderColor}`;
    }
  }
}
