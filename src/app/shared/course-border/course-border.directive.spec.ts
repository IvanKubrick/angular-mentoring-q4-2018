import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseBorderDirective } from './course-border.directive';

const day = 1000 * 60 * 60 * 24;
const longAgo = new Date(0);
const yesterday = Date.now() - day;
const tomorrow = Date.now() + day;

@Component({
  template: `
    <div [appCourseBorder]="longAgo">No border</div>
  `
})
class TestComponent {
  day = 1000 * 60 * 60 * 24;
  longAgo = new Date(0);
  yesterday = Date.now() - day;
  tomorrow = Date.now() + day;
}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    de = fixture.debugElement.query(By.directive(CourseBorderDirective));
  });

  xit('should color border of recent course in forestgreen', () => {
    fixture.detectChanges();
    const borderColor = de.nativeElement.style.borderColor;
    expect(borderColor).toBe('forestgreen');
  });
});
