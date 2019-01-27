import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseBorderDirective } from './course-border.directive';

@Component({
  template: `
    <div [appCourseBorder]="borderColor"></div>
  `
})
class TestHostComponent {
  borderColor: string;
}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let de: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestHostComponent]
    }).createComponent(TestHostComponent);

    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.directive(CourseBorderDirective));
  });

  it('should color border of recent course in forestgreen', () => {
    const day: number = 1000 * 60 * 60 * 24;
    const yesterday: string = new Date(Date.now() - day).toISOString();

    component.borderColor = yesterday;
    fixture.detectChanges();
    const borderColor: string = (<HTMLDivElement>de.nativeElement).style.borderColor;

    expect(borderColor).toBe('forestgreen');
  });

  it('should color border of upcoming course in skyblue', () => {
    const day: number = 1000 * 60 * 60 * 24;
    const tomorrow: string = new Date(Date.now() + day).toISOString();

    component.borderColor = tomorrow;
    fixture.detectChanges();
    const borderColor: string = (<HTMLDivElement>de.nativeElement).style.borderColor;

    expect(borderColor).toBe('skyblue');
  });

  it('should not color border of upcoming course in skyblue', () => {
    const longAgo: string = new Date(0).toISOString();

    component.borderColor = longAgo;
    fixture.detectChanges();
    const borderColor: string = (<HTMLDivElement>de.nativeElement).style.borderColor;

    expect(borderColor).toBe('');
  });
});
