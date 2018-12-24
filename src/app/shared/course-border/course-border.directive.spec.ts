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
    <h2 [appCourseBorder]="longAgo">No border</h2>
    <h2 [appCourseBorder]="yesterday">Green border</h2>
    <h2 [appCourseBorder]="tomorrow">Blue border</h2>
  `
})
class TestComponent {}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(CourseBorderDirective));
  });

  xit('should color 1st <h2> background "yellow"', () => {
    fixture.detectChanges();
    const borderColor = des[1].nativeElement.style.borderColor;
    expect(borderColor).toBe('forestgreen');
  });
});
