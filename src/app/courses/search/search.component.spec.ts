import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

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
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl = inputDe.nativeElement;

    inputEl.value = 'Some text value';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchString).toBe('Some text value');
  });
});
