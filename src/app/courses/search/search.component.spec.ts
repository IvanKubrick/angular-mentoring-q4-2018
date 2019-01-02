import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchString property on user input', () => {
    const inputDe: DebugElement = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLFormElement = inputDe.nativeElement;

    inputEl.value = 'Some text value';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchString).toBe('Some text value');
  });
});
