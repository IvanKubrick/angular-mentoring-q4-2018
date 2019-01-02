import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "courses" title', () => {
    const logoTitleDe: DebugElement = fixture.debugElement.query(By.css('.header-logo__title'));
    const logoTitleEl: HTMLElement = logoTitleDe.nativeElement;
    expect(logoTitleEl.textContent).toEqual('courses');
  });

  it('should contain button titled "Log Off"', () => {
    const buttonLogOffDe: DebugElement = fixture.debugElement.query(By.css('.button-log-off'));
    const buttonLogOffEl: HTMLElement = buttonLogOffDe.nativeElement;
    expect(buttonLogOffEl.textContent).toEqual('Log Off');
  });
});
