import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseBorder]'
})
export class CourseBorderDirective implements OnInit {
  @Input('appCourseBorder')
  get borderColor(): string {
    return this._borderColor;
  }
  set borderColor(value) {
    const creationDate = Number(new Date(value));
    const currentDate = Date.now();
    const twoWeeks = 1000 * 60 * 60 * 24 * 14;
    const dateTwoWeeksAgo = currentDate - twoWeeks;
    if (creationDate < currentDate && creationDate >= dateTwoWeeksAgo) {
      this._borderColor = 'forestgreen';
    } else if (creationDate > currentDate) {
      this._borderColor = 'skyblue';
    }
  }

  private _borderColor: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.borderColor) {
      this.el.nativeElement.style.border = `3px solid ${this.borderColor}`;
    }
  }
}
