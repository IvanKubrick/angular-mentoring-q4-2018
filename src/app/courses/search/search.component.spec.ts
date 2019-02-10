import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Page } from '@testing';

import { SearchComponent } from './search.component';

class TestPage extends Page<TestHostComponent> {
  get searchInput(): HTMLInputElement {
    return super.query<HTMLInputElement>('.search__input');
  }
  get searchButton(): HTMLButtonElement {
    return super.query<HTMLButtonElement>('.search__button');
  }
  get addCourseButton(): HTMLButtonElement {
    return super.query<HTMLButtonElement>('.search__button_add-course');
  }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <app-search
      (searchButtonClicked)="onSearchButtonClicked($event)"
      (addCourseButtonClicked)="onAddCourseButtonClicked()"
    ></app-search>
  `
})
class TestHostComponent {
  searchString: string;
  isAddCourseButtonClicked: boolean = false;

  onSearchButtonClicked(searchString: string): void {
    this.searchString = searchString;
  }
  onAddCourseButtonClicked(): void {
    this.isAddCourseButtonClicked = true;
  }
}

describe('SearchComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let page: TestPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, SearchComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    page = new TestPage(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event with value from input on "Search" button click', () => {
    const inputValue: string = 'course';
    page.searchInput.value = inputValue;
    page.searchInput.dispatchEvent(new Event('input'));

    page.searchButton.click();

    expect(component.searchString).toBe(inputValue);
  });

  it('should emit event on "Add course" button click', () => {
    expect(component.isAddCourseButtonClicked).toBeFalsy();
    page.addCourseButton.click();
    expect(component.isAddCourseButtonClicked).toBeTruthy();
  });
});
