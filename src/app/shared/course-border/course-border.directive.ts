import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseBorder]'
})
export class CourseBorderDirective implements OnInit {
  @Input('appCourseBorder')
  get borderColor(): string {
    return this._borderColor;
  }
  set borderColor(value: string) {
    const creationDate: number = Number(new Date(value));
    const currentDate: number = Date.now();
    const twoWeeks: number = 1000 * 60 * 60 * 24 * 14;
    const dateTwoWeeksAgo: number = currentDate - twoWeeks;

    if (creationDate < currentDate && creationDate >= dateTwoWeeksAgo) {
      this._borderColor = 'forestgreen';
    } else if (creationDate > currentDate) {
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
