import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuthService } from '@app/core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    // tslint:disable-next-line: no-unsafe-any
    authServiceMock = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    authServiceMock.isAuthenticated.and.returnValue(true);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // tslint:disable-next-line:mocha-no-side-effect-code
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  // tslint:disable-next-line:mocha-no-side-effect-code
  xit('should contain "courses" title', () => {
    const logoTitleDe: DebugElement = fixture.debugElement.query(By.css('.header-logo__title'));
    const logoTitleEl: HTMLSpanElement = <HTMLSpanElement>logoTitleDe.nativeElement;
    expect(logoTitleEl.textContent).toEqual('courses');
  });
  // tslint:disable-next-line:mocha-no-side-effect-code
  xit('should contain button titled "Log Off"', () => {
    const buttonLogOffDe: DebugElement = fixture.debugElement.query(By.css('.button-log-off'));
    const buttonLogOffEl: HTMLButtonElement = <HTMLButtonElement>buttonLogOffDe.nativeElement;
    expect(buttonLogOffEl.textContent).toEqual('Log Off');
  });
});
