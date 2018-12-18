import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the number of links equal to the length of breadcrumbs array', () => {
    component.breadcrumbs = ['courses', 'angular', 'unit-testing'];
    fixture.detectChanges();
    const breadcrumbsDe = fixture.debugElement.query(By.css('.breadcrumbs'));
    const breadcrumbsEls = breadcrumbsDe.nativeElement.querySelectorAll('.breadcrumbs__item');

    expect(breadcrumbsEls.length).toEqual(3);
  });

  it('should not create links if breadcrumbs array is null', () => {
    component.breadcrumbs = null;
    fixture.detectChanges();
    const breadcrumbsDe = fixture.debugElement.query(By.css('.breadcrumbs'));
    const breadcrumbsEl = breadcrumbsDe.nativeElement;

    expect(breadcrumbsEl.childElementCount).toEqual(0);
  });
});
