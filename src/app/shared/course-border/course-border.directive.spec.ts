import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseBorderDirective } from './course-border.directive';

@Component({
  template: `
    <div [appCourseBorder]="borderColor"></div>
  `
})
class TestComponent {
  borderColor: string;
}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  beforeEach(() => {
    const day: number = 1000 * 60 * 60 * 24;
    const longAgo: Date = new Date(0);
    const yesterday: number = Date.now() - day;
    const tomorrow: number = Date.now() + day;

    fixture = TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.directive(CourseBorderDirective));
  });

  // it('should color border of recent course in forestgreen', () => {
  //   fixture.detectChanges();
  //   const borderColor: string = de.nativeElement.style.borderColor;
  //   expect(borderColor).toBe('forestgreen');
  // });
});
