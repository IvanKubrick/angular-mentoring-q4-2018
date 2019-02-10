import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page } from '@testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';

class TestPage extends Page<TestHostComponent> {
  get breadcrumb(): HTMLSpanElement {
    return super.query<HTMLSpanElement>('span.breadcrumbs__item');
  }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <app-breadcrumbs [breadcrumb]="breadcrumb"></app-breadcrumbs>
  `
})
class TestHostComponent {
  breadcrumb: string;
}

describe('BreadcrumbsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: TestPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, BreadcrumbsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.breadcrumb = 'test';
    page = new TestPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct breadcrumb received via Input', () => {
    expect(page.breadcrumb.textContent).toBe('test');
  });

  it('should be empty if Input is null', () => {
    component.breadcrumb = null;
    fixture.detectChanges();
    expect(page.breadcrumb.textContent).toBe('');
  });
});
